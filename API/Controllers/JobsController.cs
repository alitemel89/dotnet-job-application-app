using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
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

        public JobsController(DataContext context)
        {
            _context = context;
        }

        private static readonly List<Job> Jobs = new List<Job>();

        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            var jobs = _context.Jobs.ToList();

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
        public IActionResult PostJob(Job job)
        {
            _context.Jobs.Add(job);
            _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetJob), new { id = job.JobId }, job);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(Guid id)
        {
            // Find the job by the specified id
            var job = await _context.Jobs.FindAsync(id);
            if (job == null)
            {
                return NotFound("Job not found.");
            }

            // Remove the job from the context and save changes
            _context.Jobs.Remove(job);
            await _context.SaveChangesAsync();

            return Ok("Job is deleted.");
        }
    }

}