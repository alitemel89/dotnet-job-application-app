using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Jobs.Any()) return;

            var jobs = new List<Job>
            {
                new Job
                {
                CompanyName = "Company A",
                Position = "Software Developer",
                Description = "Job description for Software Developer position at Company A"
                },
                new Job
                {
                CompanyName = "Company B",
                Position = "Frontend Developer",
                Description = "Job description for Frontend Developer position at Company B"
                },
                new Job
                {
                CompanyName = "Company C",
                Position = "Backend Developer",
                Description = "Job description for Backend Developer position at Company C"
                },
            };

            await context.Jobs.AddRangeAsync(jobs);
            await context.SaveChangesAsync();
        }
    }
}