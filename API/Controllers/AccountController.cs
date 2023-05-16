using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
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

        public AccountController(DataContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
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
        public IActionResult Register(RegisterDto registerDto)
        {
            // Check if the provided email already exists
            if (_context.Users.Any(u => u.Email == registerDto.Email))
            {
                return BadRequest("Email is already registered.");
            }

            // Create a new User object
            var user = new User
            {
                Email = registerDto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(registerDto.PasswordHash),
                CompanyName = registerDto.CompanyName
            };

            _context.Users.Add(user);
            _context.SaveChanges();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto loginModel)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == loginModel.Email);
            if (user == null)
            {
                return BadRequest("Invalid credentials.");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginModel.Password, user.PasswordHash))
            {
                return BadRequest("Invalid credentials.");
            }

            string token = CreateToken(user);

            return Ok(new { token });
        }



        private string CreateToken(User user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.CompanyName)
            };

            var key = new byte[64]; // Generate a 512-bit (64-byte) key
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(key);
            }

            var symmetricSecurityKey = new SymmetricSecurityKey(key);
            var signingCredentials = new SigningCredentials(symmetricSecurityKey, SecurityAlgorithms.HmacSha512);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(1),
                SigningCredentials = signingCredentials
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            var jwt = tokenHandler.WriteToken(token);

            return jwt;
        }
    }
}