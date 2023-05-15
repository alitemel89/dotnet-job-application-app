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
    [Route("api/jobapplications")]
    public class JobApplicationsController : ControllerBase
    {

        private readonly DataContext _context;

        public JobApplicationsController(DataContext context)
        {
            _context = context;
        }

        
        private static readonly List<JobApplication> Applications = new List<JobApplication>();

        [HttpGet]
        public async Task<ActionResult<List<Job>>> GetJobs()
        {
            return Ok(await _context.JobApplications.ToListAsync());
        }
    }

}