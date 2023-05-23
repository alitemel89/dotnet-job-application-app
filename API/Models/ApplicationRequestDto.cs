using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class ApplicationRequestDto
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string ResumeFilePath { get; set; }
        public Guid JobId { get; set; }
        public DateTime AppliedDate { get; set; }

    }
}