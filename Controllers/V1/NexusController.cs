using Microsoft.AspNetCore.Mvc;
using NexusApi.Context;
using NexusApi.Models;
using NexusApi.Interfaces;
using System.Threading.Tasks;
using NexusApi.Filters;
using Newtonsoft.Json;
using System;

namespace NexusApi.Controllers.V1
{
    [ApiVersion("1.0")]
    [Route("api/[controller]")]
    [ApiController]
    public class NexusController : ControllerBase
    {
        private readonly NexusContext _context;
        private readonly IUserService _userService;
        public NexusController(NexusContext context, IUserService userservice)
        {
            this._context = context;
            this._userService = userservice;
        }

        /// <summary>
        /// GetUser get s user filtered by id
        /// </summary>
        /// <param name="id">Id of the user to search</param>
        /// <returns>A detailed data model from the user</returns>
        [HttpGet()]
        [ValidationRequest]
        public async Task<ActionResult<UserModel>> GetUser()
        {
            string body = HttpContext.Items["request_body"].ToString();
            //var request = JsonConvert.DeserializeObject<>(body);
            Logs log = null;
            var id = 0;
            try
            {
                var user = await _userService.Get(_context, id);

                log = new Logs()
                {
                    action = Actions.USER_GET,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = user == null ? "User not found" : "User succesfully founded",
                    user_id = id
                };

                await _userService.createLog(_context, log);

                if (user != null)
                    return Created("User", user);
                else
                    return NotFound();
            }
            catch (System.Exception ex)
            {
                await _userService.createLog(_context, new Logs()
                {
                    action = $"{Actions.USER_GET}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    user_id = id
                });

                return Conflict(ex.StackTrace);
            }
        }


    }
}
