using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Helper;
using Microsoft.AspNetCore.StaticFiles;
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
        public async Task<IActionResult> PostJobApplication([FromForm] ApplicationRequestDto applicationRequest)
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

            var resumeFile = applicationRequest.ResumeFilePath;
            if (resumeFile != null && resumeFile.Length > 0)
            {
                var resumeFileName = await UploadFile(resumeFile);
                application.ResumeFilePath = resumeFileName;
            }

            application.AppliedDate = DateTime.UtcNow;
            _context.Applications.Add(application);
            await _context.SaveChangesAsync();

            // return CreatedAtAction(nameof(GetApplications), new { id = application.JobId }, application);
            return Ok(application);
        }


        private async Task<string> UploadFile(IFormFile _IFormFile)
        {
            string FileName = "";
            try
            {
                FileInfo _FileInfo = new FileInfo(_IFormFile.FileName);
                FileName = _IFormFile.FileName + "_" + DateTime.Now.Ticks.ToString() + _FileInfo.Extension;
                var _GetFilePath = Common.GetFilePath(FileName);
                using (var _FileStream = new FileStream(_GetFilePath, FileMode.Create))
                {
                    await _IFormFile.CopyToAsync(_FileStream);
                }
                return FileName;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("download")]
        public async Task<FileContentResult> DownloadFile(string FileName)
        {
            try
            {
                var _GetFilePath = Common.GetFilePath(FileName);
                var provider = new FileExtensionContentTypeProvider();
                if (!provider.TryGetContentType(_GetFilePath, out var _ContentType))
                {
                    _ContentType = "application/octet-stream";
                }
                var _ReadAllBytesAsync = await System.IO.File.ReadAllBytesAsync(_GetFilePath);

                return new FileContentResult(_ReadAllBytesAsync, _ContentType)
                {
                    FileDownloadName = Path.GetFileName(_GetFilePath)
                };
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}