using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class UserModel: User
    {
        public int session_type { get; set; }
        public string team_name { get; set; }
    }
}
