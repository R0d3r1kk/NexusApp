using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class UserModel : Users
    {
        public int session_type { get; set; }
        public string team_name { get; set; }
    }

    public class TokenModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }
}
