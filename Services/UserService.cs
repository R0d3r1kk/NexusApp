using NexusApi.Context;
using NexusApi.Interfaces;
using NexusApi.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Services
{
    public class UserService : IUserService
    {
        public async Task<bool> Add(NexusContext _context, Users request)
        {
            if (request == null)
                return false;
            try
            {

                var founded = _context.Users.Select(u => u.email == request.email);
                if (founded == null)
                {
                    _context.Users.Add(request);
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                    throw new ArgumentException("User email exist");
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> createLog(NexusContext _context, Logs request)
        {
            if (request == null)
                return false;

            try
            {
                _context.Logs.Add(request);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Edit(NexusContext _context, Users request)
        {
            if (request == null)
                return false;

            try
            {
                var founded = await _context.Users.FindAsync(request.user_id);
                if (founded != null)
                {
                    _context.Users.Update(request);

                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<UserModel> Get(NexusContext _context, int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return null;

            UserModel usermodel = (UserModel)user;

            if (user.session_id > 0)
            {
                var session = await _context.UserSesion.FindAsync(user.session_id);
                usermodel.session_type = session.type;
            }
            if (user.team_id > 0)
            {
                var team = await _context.CTeams.FindAsync(user.team_id);
                usermodel.team_name = team.name;
            }

            return usermodel;
        }

        public async Task<bool> Remove(NexusContext _context, int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return false;

            try
            {
                _context.Users.Remove(user);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> changeUserTeam(NexusContext _context, ChangeTeamRequest request)
        {
            if (request == null)
                return false;

            try
            {
                var user = await _context.Users.FindAsync(request.user_id);

                var newteamfounded = await _context.CTeams.FindAsync(request.new_team_id);
                if (user.team_id <= 0)
                    throw new ArgumentException($"Team ID[{request.new_team_id}] not found");

                if (user != null)
                {
                    var teamfounded = await _context.CTeams.FindAsync(user.team_id);
                    if (teamfounded == null)
                        throw new ArgumentException($"User Team ID[{request.new_team_id}] not founded");

                    user.team_id = request.new_team_id;
                    _context.Users.Update(user);

                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
