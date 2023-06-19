using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class JobRequestDto
    {
        public string JobId { get; set; }
        public string Position { get; set; }
        public string Location { get; set; }
        public string Description { get; set; }
        public string UserId { get; set; }
        public string UserEmail { get; set; }
        public string UserPasswordHash { get; set; }
        public string UserCompanyName { get; set; }

    }
}