using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
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


        private static readonly List<JobApplication> Applications = new List<JobApplication>();

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

    }

}