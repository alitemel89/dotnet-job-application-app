using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [ApiController]
    [Route("api/account")]
    public class AccountController : ControllerBase
    {
        private static readonly List<User> Users = new List<User>();
        private readonly IConfiguration _configuration;
        private readonly DataContext _context;

        public AccountController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(Guid id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user);
        }


        [HttpPost("register")]
        public IActionResult Register(User user)
        {
            string passwordHash = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash);

            _context.Users.Add(user);
            _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }
    }
}