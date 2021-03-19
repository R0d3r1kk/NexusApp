using NexusApi.Context;
using NexusApi.Models;
using System.Threading.Tasks;

namespace NexusApi.Interfaces
{
    public interface ITeamService
    {
        Task<CTeam> Get(NexusContext context, int id);
        Task<bool> Add(NexusContext context, CTeam request);
        Task<bool> Edit(NexusContext context, CTeam request);
        Task<bool> Remove(NexusContext context, int id);
        Task<bool> createLog(NexusContext context, Logs request);
    }
}
