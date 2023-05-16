using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string Email { get; set; } 
        public string PasswordHash { get; set; } 
        public string CompanyName { get; set; }
    }
}