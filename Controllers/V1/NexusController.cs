using Microsoft.AspNetCore.Mvc;
using NexusApi.Context;
using NexusApi.Models;
using NexusApi.Interfaces;
using System.Threading.Tasks;
using NexusApi.Filters;
using Newtonsoft.Json;

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
            var id = 0;
            try
            {
                var user = await _userService.Get(_context, id);
                if (user == null)
                    return NotFound();

                return user;
            }
            catch (System.Exception ex)
            {
                return Conflict(ex.StackTrace);
            }
        }


    }
}
