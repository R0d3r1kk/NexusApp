using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using NexusApi.Context;
using NexusApi.Filters;
using NexusApi.Interfaces;
using NexusApi.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace NexusApi.Controllers.V1
{
    [ApiVersion("1")]
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class AuthenticationController : ControllerBase
    {
        private readonly NexusContext _context;
        private readonly IUserService _userService;

        public AuthenticationController(NexusContext context, IUserService userService)
        {
            this._context = context;
            this._userService = userService;
        }

        [HttpPost("Login")]
        [ValidationRequest]
        public async Task<ActionResult<LoginRequest>> Login()
        {
            string body = HttpContext.Items["request_body"].ToString();
            var request = JsonConvert.DeserializeObject<LoginRequest>(body);

            if (request == null)
                return BadRequest();

            try
            {
                var user = _context.Users.SingleOrDefault(u => u.email == request.email && u.password == request.password);
                if (user != null)
                {
                    var tkn = GenerateToken(user);
                    return Ok(tkn);
                }
                else
                    return NotFound();

            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _userService.createLog(_context, new Logs()
                {
                    action = $"{Actions.LOGIN}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = -1,
                    action_responsible = -1
                });

                return Conflict(ex.StackTrace);
            }
        }

        [AllowAnonymous]
        [HttpPost("/token")]
        public IActionResult Get(string username, string password)
        {
            if (username == password)
                return Ok(GenerateToken(username));
            else
                return Unauthorized();
        }

        private string GenerateToken(string username)
        {
            // Leemos el secret_key desde nuestro appseting
            var key = Encoding.ASCII.GetBytes(GlobalSettings.Secret);

            // Creamos los claims (pertenencias, características) del usuario
            var claims = new[]
            {
                        new Claim(ClaimTypes.NameIdentifier, username),
                    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                // Nuestro token va a durar un día
                Expires = DateTime.UtcNow.AddMinutes(30),
                // Credenciales para generar el token usando nuestro secretykey y el algoritmo hash 256
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var tkn = tokenHandler.WriteToken(createdToken);
            return tkn;
        }

        private string GenerateToken(Users user)
        {
            // Leemos el secret_key desde nuestro appseting
            var key = Encoding.ASCII.GetBytes(GlobalSettings.Secret);

            // Creamos los claims (pertenencias, características) del usuario
            var claims = new[]
                     {
                        new Claim("UserData", JsonConvert.SerializeObject(user)),
                        new Claim(ClaimTypes.NameIdentifier, user.user_id.ToString()),
                        new Claim(ClaimTypes.Email, user.email)
                    };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                // Nuestro token va a durar un día
                Expires = DateTime.UtcNow.AddMinutes(30),
                // Credenciales para generar el token usando nuestro secretykey y el algoritmo hash 256
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var createdToken = tokenHandler.CreateToken(tokenDescriptor);
            var tkn = tokenHandler.WriteToken(createdToken);
            return tkn;
        }
    }
}
