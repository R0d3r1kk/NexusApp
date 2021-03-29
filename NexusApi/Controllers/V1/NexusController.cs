﻿using Microsoft.AspNetCore.Mvc;
using NexusApi.Context;
using NexusApi.Models;
using NexusApi.Interfaces;
using System.Threading.Tasks;
using NexusApi.Filters;
using Newtonsoft.Json;
using System;
using Microsoft.AspNetCore.Authorization;
using System.Linq;
using NexusApi.Helpers;

namespace NexusApi.Controllers.V1
{
    [ApiVersion("1")]
    [Route("api/[controller]")]
    [Authorize]
    [ApiController]
    public class NexusController : ControllerBase
    {
        private readonly NexusContext _context;
        private readonly IUserService _userService;
        private readonly IAccountService _accountService;
        private readonly ITeamService _teamService;

        public NexusController(NexusContext context, IUserService userService, IAccountService accountService, ITeamService teamService)
        {
            this._context = context;
            this._userService = userService;
            this._accountService = accountService;
            this._teamService = teamService;
        }

        [HttpPost("User")]
        [ValidationRequest]
        public async Task<ActionResult<UserModel>> GetUser()
        {

            var request = Extensions.getRequest<GetRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var user = (Users)await _userService.Get(_context, request.id);


                await _userService.createLog(_context, new Logs()
                {
                    action = Actions.USER_GET,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = user == null ? "User not found" : "User succesfully founded",
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                if (user != null)
                    return Created("User", user);
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
                    action = $"{Actions.USER_GET}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }
        }

        [HttpGet("All")]
        public async Task<ActionResult<UserModel>> GetAll()
        {
            try
            {
                var users = _context.Users.ToList();

                if (users != null)
                {
                    var cypher = CryptoHelper.Encrypt(JsonConvert.SerializeObject(users), GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                    return Ok(cypher);
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
                return Conflict(ex.StackTrace);
            }
        }

        [HttpPost("AddUser")]
        [ValidationRequest]
        public async Task<ActionResult> addUser()
        {

            var request = Extensions.getRequest<AddUserRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var created = await _userService.Add(_context, request);

                await _userService.createLog(_context, new Logs()
                {
                    action = Actions.USER_CREATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = created ? "User succesfully created" : "Error creating user",
                    model_id = request.user_id,
                    op_responsible_id = request.op_responsible_id
                });

                if (created)
                {
                    //var cypher = CryptoHelper.Encrypt(JsonConvert.SerializeObject(request), GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                    return Created("User", created);
                }
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _userService.createLog(_context, new Logs()
                {
                    action = $"{Actions.USER_CREATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.user_id,
                    op_responsible_id = request.op_responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("EditUser")]
        [ValidationRequest]
        public async Task<ActionResult> EditUser()
        {

            var request = Extensions.getRequest<AddUserRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var updated = await _userService.Edit(_context, request);

                await _userService.createLog(_context, new Logs()
                {
                    action = Actions.USER_UPDATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = updated ? "User succesfully edited" : "Error editing user",
                    model_id = request.user_id,
                    op_responsible_id = request.op_responsible_id
                });

                if (updated)
                    return Created("User", request);
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _userService.createLog(_context, new Logs()
                {
                    action = $"{Actions.USER_UPDATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.user_id,
                    op_responsible_id = request.op_responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("ChangeTeam")]
        [ValidationRequest]
        public async Task<ActionResult> ChangeTeam()
        {

            var request = Extensions.getRequest<ChangeTeamRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var updated = await _userService.changeUserTeam(_context, request);

                await _userService.createLog(_context, new Logs()
                {
                    action = Actions.USER_UPDATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = updated ? "User team succesfully changed" : "Error changing user team",
                    model_id = request.user_id,
                    op_responsible_id = request.responsible_id
                });

                if (updated)
                    return Created("User", request);
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _userService.createLog(_context, new Logs()
                {
                    action = $"{Actions.USER_UPDATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.user_id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("RemoveUser")]
        [ValidationRequest]
        public async Task<ActionResult> RemoveUser()
        {
            var request = Extensions.getRequest<DeleteRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var deleted = await _userService.Remove(_context, request.id);

                await _userService.createLog(_context, new Logs()
                {
                    action = Actions.USER_DELETE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = deleted ? "User succesfully deleted" : "Error deleting user",
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                if (deleted)
                    return Ok();
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _userService.createLog(_context, new Logs()
                {
                    action = $"{Actions.USER_DELETE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }
        }

        [HttpPost("Account")]
        [ValidationRequest]
        public async Task<ActionResult<Accounts>> GetAccount()
        {
            var request = Extensions.getRequest<GetRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var acc = await _accountService.Get(_context, request.id);


                await _accountService.createLog(_context, new Logs()
                {
                    action = Actions.USER_GET,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = acc == null ? "Account not found" : "Account succesfully founded",
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                if (acc != null)
                    return Created("Accounts", acc);
                else
                    return NotFound();
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _accountService.createLog(_context, new Logs()
                {
                    action = $"{Actions.ACCOUNT_GET}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }
        }

        [HttpPost("AddAccount")]
        [ValidationRequest]
        public async Task<ActionResult> addAccount()
        {

            var request = Extensions.getRequest<AddAccountRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var created = await _accountService.Add(_context, request);

                await _accountService.createLog(_context, new Logs()
                {
                    action = Actions.ACCOUNT_CREATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = created ? "Account succesfully created" : "Error creating Account",
                    model_id = request.account_id,
                    op_responsible_id = request.op_responsible_id
                });

                if (created)
                    return Created("Account", request);
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _accountService.createLog(_context, new Logs()
                {
                    action = $"{Actions.ACCOUNT_CREATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.account_id,
                    op_responsible_id = request.op_responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("EditAccount")]
        [ValidationRequest]
        public async Task<ActionResult> EditAccount()
        {

            var request = Extensions.getRequest<AddAccountRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var updated = await _accountService.Edit(_context, request);

                await _accountService.createLog(_context, new Logs()
                {
                    action = Actions.ACCOUNT_UPDATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = updated ? "Account succesfully edited" : "Error editing account",
                    model_id = request.account_id,
                    op_responsible_id = request.op_responsible_id
                });

                if (updated)
                    return Created("Account", request);
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _accountService.createLog(_context, new Logs()
                {
                    action = $"{Actions.ACCOUNT_UPDATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.account_id,
                    op_responsible_id = request.op_responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("RemoveAccount")]
        [ValidationRequest]
        public async Task<ActionResult> RemoveAccount()
        {
            var request = Extensions.getRequest<DeleteRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var deleted = await _accountService.Remove(_context, request.id);

                await _accountService.createLog(_context, new Logs()
                {
                    action = Actions.ACCOUNT_DELETE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = deleted ? "Account succesfully deleted" : "Error deleting account",
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                if (deleted)
                    return Ok();
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _accountService.createLog(_context, new Logs()
                {
                    action = $"{Actions.ACCOUNT_DELETE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }
        }

        [HttpPost("Team")]
        [ValidationRequest]
        public async Task<ActionResult<CTeam>> GetTeam()
        {
            var request = Extensions.getRequest<GetRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var team = await _teamService.Get(_context, request.id);


                await _teamService.createLog(_context, new Logs()
                {
                    action = Actions.TEAM_GET,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = team == null ? "User not found" : "User succesfully founded",
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                if (team != null)
                    return Created("Team", team);
                else
                    return NotFound();
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _teamService.createLog(_context, new Logs()
                {
                    action = $"{Actions.TEAM_GET}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }
        }

        [HttpPost("AddTeam")]
        [ValidationRequest]
        public async Task<ActionResult> addTeam()
        {

            var request = Extensions.getRequest<AddTeamRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var created = await _teamService.Add(_context, request);

                await _teamService.createLog(_context, new Logs()
                {
                    action = Actions.TEAM_CREATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = created ? "Team succesfully created" : "Error creating Account",
                    model_id = request.team_id,
                    op_responsible_id = request.op_responsible_id
                });

                if (created)
                    return Created("Account", request);
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _teamService.createLog(_context, new Logs()
                {
                    action = $"{Actions.TEAM_CREATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.team_id,
                    op_responsible_id = request.op_responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("EditTeam")]
        [ValidationRequest]
        public async Task<ActionResult> EditTeam()
        {

            var request = Extensions.getRequest<AddTeamRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var updated = await _teamService.Edit(_context, request);

                await _teamService.createLog(_context, new Logs()
                {
                    action = Actions.TEAM_UPDATE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = updated ? "Account succesfully edited" : "Error editing account",
                    model_id = request.team_id,
                    op_responsible_id = request.op_responsible_id
                });

                if (updated)
                    return Created("Account", request);
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _teamService.createLog(_context, new Logs()
                {
                    action = $"{Actions.TEAM_UPDATE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.team_id,
                    op_responsible_id = request.op_responsible_id
                });

                return Conflict(ex.StackTrace);
            }

        }

        [HttpPost("RemoveTeam")]
        [ValidationRequest]
        public async Task<ActionResult> RemoveTeam()
        {
            var request = Extensions.getRequest<DeleteRequest>(HttpContext);
            if (request == null)
                return BadRequest();

            try
            {
                var deleted = await _teamService.Remove(_context, request.id);

                await _teamService.createLog(_context, new Logs()
                {
                    action = Actions.TEAM_DELETE,
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = deleted ? "Team succesfully deleted" : "Error deleting Team",
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                if (deleted)
                    return Ok();
                else
                    return StatusCode(500);
            }
            catch (ArgumentException ex)
            {
                return StatusCode(500, ex.Message);
            }
            catch (Exception ex)
            {
                await _teamService.createLog(_context, new Logs()
                {
                    action = $"{Actions.TEAM_DELETE}_EXCEPTION[TYPE: {ex.GetType().Name}]",
                    log_type = (int)LogType.API,
                    date = DateTime.Now,
                    message = ex.StackTrace,
                    model_id = request.id,
                    op_responsible_id = request.responsible_id
                });

                return Conflict(ex.StackTrace);
            }
        }
    }
}
