using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class UserTeamChanges
    {
        [Key]
        public int change_id { get; set; }
        public int user_id { get; set; }
        public DateTime? date_start { get; set; }
        public DateTime? date_end { get; set; }
        public int team_id { get; set; }
        public string action { get; set; }
    }
}
