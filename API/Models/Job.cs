using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Job
    {
        public Guid JobId { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public User User { get; set; }
    }
}