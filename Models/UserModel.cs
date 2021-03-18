using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class UserModel: User
    {
        public UserSession session { get; set; }
        public CTeam team { get; set; }
    }
}
