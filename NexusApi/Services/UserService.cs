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

                var founded = _context.Users.SingleOrDefault(u => u.email == request.email);
                if (founded == null)
                {
                    request.date_created = DateTime.Now;
                    _context.Users.Add(request);
                    _context.UserTeamChanges.Add(new UserTeamChanges()
                    {
                        team_id = request.team_id,
                        user_id = request.user_id,
                        date_start = DateTime.Now,
                        action = "ADDING USER TO TEAM"
                    });
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
                    var changefounded = _context.UserTeamChanges.SingleOrDefault(u => u.user_id == user.user_id && u.team_id == user.team_id);
                    if (changefounded != null)
                    {
                        changefounded.date_end = DateTime.Now;
                        changefounded.action = "CHANGING USER TEAM";
                        _context.UserTeamChanges.Update(changefounded);
                    }

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
