using System;

namespace NexusApi.Models
{
    public class User
    {
        public int user_id { get; set; }
        public string name { get; set; }
        public string email { get; set; }
        public string password { get; set; }
        public int session_id { get; set; }
        public int team_id { get; set; }
    }
}
