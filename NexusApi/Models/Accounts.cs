﻿

using System.ComponentModel.DataAnnotations;

namespace NexusApi.Models
{
    public class Accounts
    {
        [Key]
        public int account_id { get; set; }
        public string account_name { get; set; }
        public string account_client { get; set; }
        public string operation_responible { get; set; }
        public string team_id { get; set; }

    }
}