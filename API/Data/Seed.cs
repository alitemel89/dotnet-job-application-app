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
            if (context.Users.Any()) return;
            if (context.Applications.Any()) return;

            var user = new User
            {
                Id = Guid.Parse("ac1279a6-bfad-40fa-bbfb-08db5717bdd1"),
                Email = "ssd@gmail.com",
                PasswordHash = "$2a$11$wr0szNCb1M/JT1O8D9WPa.dQdblA2ZNtcGmAj47XfN4qDzUcIEGZS",
                CompanyName = "SSD GmbH."
            };


            var jobs = new List<Job>
            {
                new Job
                {
                Position = "Software Developer",
                Description = "Job description for Software Developer position at SSD GmBH",
                User = user,
                Location= "Berlin, Germany"
                }
            };

            var users = new List<User>
            {
                new User
                {
                    CompanyName = "SSD Gmbh.",
                    Email="SSD@gmail.com",
                    PasswordHash="$2a$11$KGmGS3xiljdiNnHqRVUmQ.bXxCNaubJB0HJg1db9.StiRqR.oWA72"
                }
            };


            var applications = new List<Application>{
                new Application
                 {
                     ApplicationId = Guid.NewGuid(),
                     Name = "John Doe",
                     Email = "johndoe@example.com",
                     ResumeFilePath = "Path/To/Resume1.pdf",
                     AppliedDate = DateTime.UtcNow
                 }
            };


            await context.Jobs.AddRangeAsync(jobs);
            await context.Users.AddRangeAsync(users);
            await context.Applications.AddRangeAsync(applications);
            await context.SaveChangesAsync();
        }
    }
}