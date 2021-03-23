using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class Logs
    {
        [Key]
        public int log_id { get; set; }
        public string message { get; set; }
        public int log_type { get; set; }
        public int model_id { get; set; }
        public DateTime date { get; set; }
        public string action { get; set; }
        public int action_responsible { get; set; }
    }
}
