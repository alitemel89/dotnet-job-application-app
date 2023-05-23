using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/applications")]
    // [Authorize]
    public class ApplicationsController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly IWebHostEnvironment _hostEnvironment;
        private readonly IMapper _mapper;

        public ApplicationsController(DataContext context, IWebHostEnvironment hostEnvironment, IMapper mapper)
        {
            _context = context;
            _hostEnvironment = hostEnvironment;
            _mapper = mapper;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Application>> GetApplications()
        {
            var applications = _context.Applications.ToList();
            return Ok(applications);
        }


        [HttpPost]
        public async Task<IActionResult> PostJobApplication(ApplicationRequestDto applicationRequest)
        {
            var application = _mapper.Map<Application>(applicationRequest);
            if (applicationRequest == null)
            {
                return BadRequest("Invalid request body");
            }

            var job = await _context.Jobs.FindAsync(applicationRequest.JobId);

            if (job == null)
            {
                return BadRequest("Invalid JobId");
            }

        
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            // return CreatedAtAction(nameof(GetApplications), new { id = application.JobId }, application);
            return Ok(application);

        }
    }
}