using NexusApi.Context;
using NexusApi.Interfaces;
using NexusApi.Models;
using System;
using System.Threading.Tasks;

namespace NexusApi.Services
{
    public class TeamService : ITeamService
    {
        public async Task<bool> Add(NexusContext _context, CTeam request)
        {
            if (request == null)
                return false;
            try
            {
                _context.CTeams.Add(request);
                await _context.SaveChangesAsync();
                return true;
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

        public async Task<bool> Edit(NexusContext _context, CTeam request)
        {
            if (request == null)
                return false;

            try
            {
                var founded = await _context.CTeams.FindAsync(request.team_id);
                if (founded != null)
                {
                    _context.CTeams.Update(request);

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

        public async Task<CTeam> Get(NexusContext _context, int id)
        {
            try
            {
                var team = await _context.CTeams.FindAsync(id);

                if (team == null)
                    throw new ArgumentException($"Team ID[{id}] not found");

                return team;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Remove(NexusContext _context, int id)
        {
            var team = await _context.CTeams.FindAsync(id);

            if (team == null)
                return false;

            try
            {
                _context.CTeams.Remove(team);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
