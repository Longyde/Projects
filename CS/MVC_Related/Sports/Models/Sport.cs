using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Sports.Models
{
    public class Sport
    {
        public int Id { get; set; }
        [Required]
        public string Sports { get; set; }
        [Required]
        public string Team { get; set; }
        [Required]
        public string Player { get; set; }
        public Sport()
        {

        }
    }
}
