using NexusApi.Context;
using NexusApi.Interfaces;
using NexusApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Services
{
    public class UserService : IUserService
    {
        public async Task<bool> Add(NexusContext _context, User request)
        {
            if (request == null)
                return false;
            try
            {
                _context.User.Add(request);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<UserModel> Get(NexusContext _context, int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
                return null;

            UserModel usermodel = (UserModel)user;

            if (user.session_id > 0)
            {
                usermodel.session = await _context.UserSesion.FindAsync(user.session_id);
            }
            if (user.team_id > 0)
            {
                usermodel.team = await _context.CTeams.FindAsync(user.team_id);
            }

            return usermodel;
        }
    }
}
