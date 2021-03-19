using System.ComponentModel.DataAnnotations;

namespace NexusApi.Models
{
    public class CTeam
    {
        [Key]
        public int team_id { get; set; }
        public string name { get; set; }
    }
}
