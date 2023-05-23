using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class Application
    {
        [Key]
        public Guid ApplicationId { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        public string ResumeFilePath { get; set; }

        public Guid JobId { get; set; }
        public DateTime AppliedDate { get; set; }
    }
}