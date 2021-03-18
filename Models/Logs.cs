using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class Logs
    {
        public int log_id { get; set; }
        public string message { get; set; }
        public int log_type { get; set; }
        public int user_id { get; set; }
        public DateTime date { get; set; }
        public string action { get; set; }
    }
}
