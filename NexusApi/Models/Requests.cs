using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class DeleteRequest
    {
        public int id { get; set; }
        public int op_responsible_id { get; set; }
    }

    public class GetRequest
    {
        public int id { get; set; }
        public int op_responsible_id { get; set; }
    }

    public class ChangeTeamRequest
    {
        public int user_id { get; set; }
        public int op_responsible_id { get; set; }
        public int new_team_id { get; set; }
    }

    public class AddUserRequest : Users
    {
        public int op_responsible_id { get; set; }
    }

    public class AddAccountRequest : Accounts
    {
        public int op_responsible_id { get; set; }
    }

    public class AddTeamRequest : CTeam
    {
        public int op_responsible_id { get; set; }
    }
}
