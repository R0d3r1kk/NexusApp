using NexusApi.Context;
using NexusApi.Models;
using System.Threading.Tasks;

namespace NexusApi.Interfaces
{
    public interface IAccountService
    {
        Task<Accounts> Get(NexusContext context, int id);
        Task<bool> Add(NexusContext context, Accounts request);
        Task<bool> Edit(NexusContext context, Accounts request);
        Task<bool> Remove(NexusContext context, int id);
        Task<bool> createLog(NexusContext context, Logs request);
    }
}
