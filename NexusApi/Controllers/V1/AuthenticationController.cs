using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using NexusApi.Context;
using NexusApi.Filters;
using NexusApi.Interfaces;
using NexusApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    [ApiController]
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
                var user =  _context.Users.Where(u => u.email == request.email && u.password == request.password).Single();
                if (user != null)
                    return Ok(user);
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
    }
}
