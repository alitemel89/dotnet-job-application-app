using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{

    [ApiController]
    [Route("api/jobs")]
    public class JobsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public JobsController(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        private static readonly List<Job> Jobs = new List<Job>();

        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            var jobs = _context.Jobs.Include(j => j.User).ToList();

            if (jobs.Count == 0)
            {
                return NotFound("No jobs found.");
            }
            return Ok(await _context.Jobs.ToListAsync());
        }

        [HttpGet("{id}")]
        public IActionResult GetJob(Guid id)
        {
            var job = _context.Jobs.FirstOrDefault(j => j.JobId == id);
            if (job == null)
            {
                return NotFound("Job not found.");
            }
            return Ok(job);
        }

        [Authorize]
        [HttpPost]
        public IActionResult PostJob(JobRequestDto jobRequest)
        {
            var job = _mapper.Map<Job>(jobRequest);
            // Get the current user's ID from the claims
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            // Retrieve the user from the database
            var user = _context.Users.FirstOrDefault(u => u.Email == userEmail);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Set the user properties of the job
            job.User = user;

            _context.Jobs.Add(job);
            _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJob), new { id = job.JobId }, job);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public IActionResult DeleteJob(string id)
        {
            // Find the job by ID
            var job = _context.Jobs.Include(j => j.User).FirstOrDefault(j => j.JobId.ToString() == id);
            var userEmail = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Email)?.Value;

            if (userEmail == null)
            {
                return Unauthorized();
            }
            
            if (job.User == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Job user is null.");
            }

            if (job.User.Email != userEmail)
            {
                return Forbid();
            }

            _context.Jobs.Remove(job);
            _context.SaveChangesAsync();

            return Ok("Job is deleted.");
        }
    }

}