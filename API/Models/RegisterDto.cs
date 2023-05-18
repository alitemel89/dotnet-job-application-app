using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }
        [Required]
        [RegularExpression("^(?=.*[A-Z])(?=.*\\d).{6,12}$", ErrorMessage = "Password must be 6-12 characters long and include at least one uppercase letter and a number.")]
        public string PasswordHash { get; set; }
        [Required]
        public string CompanyName { get; set; }
    }

}