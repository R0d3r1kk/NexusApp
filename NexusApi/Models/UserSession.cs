
using System.ComponentModel.DataAnnotations;

namespace NexusApi.Models
{
    public class UserSession
    {
        [Key]
        public int session_id { get; set; }
        public int type { get; set; }
    }
}
