

using System;
using System.ComponentModel.DataAnnotations;

namespace NexusApi.Models
{
    public class Accounts
    {
        [Key]
        public int account_id { get; set; }
        public string account_name { get; set; }
        public string account_client { get; set; }
        public int team_id { get; set; }
        public DateTime date_created { get; set; }

    }
}
