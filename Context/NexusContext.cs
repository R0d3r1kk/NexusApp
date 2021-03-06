using Microsoft.EntityFrameworkCore;
using NexusApi.Models;

namespace NexusApi.Context
{
    public class NexusContext: DbContext
    {
        public NexusContext(DbContextOptions<NexusContext> options)
            : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<UserSession> UserSesion { get; set; }
        public DbSet<CTeam> CTeams { get; set; }
    }
}
