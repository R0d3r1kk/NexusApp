using NexusApi.Context;
using NexusApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Interfaces
{
    public interface IUserService
    {
        Task<UserModel> Get(NexusContext context, int id);
        Task<bool> Add(NexusContext context, AddUserRequest request);
        Task<bool> Edit(NexusContext context, Users request);
        Task<bool> Remove(NexusContext context, int id);
        Task<bool> createLog(NexusContext context, Logs request);
        Task<bool> changeUserTeam(NexusContext context, ChangeTeamRequest request);
    }
}
