using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Route("api/jobapplications")]
    public class JobApplicationsController : ControllerBase
    {
        private static readonly List<JobApplication> Applications = new List<JobApplication>();

        [HttpGet]
        public IActionResult GetAllApplications()
        {
            return Ok(Applications);
        }

        [HttpPost]
        public IActionResult SubmitApplication(JobApplication application)
        {
            application.ApplicationDate = DateTime.Now;
            Applications.Add(application);
            return CreatedAtAction(nameof(GetApplicationById), new { id = application.Id }, application);
        }

        [HttpGet("{id}")]
        public IActionResult GetApplicationById(Guid id)
        {
            var application = Applications.Find(a => a.Id == id);
            if (application == null)
                return NotFound();

            return Ok(application);
        }
    }

}