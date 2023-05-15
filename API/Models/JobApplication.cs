using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models
{
    public class JobApplication
    {
        public string Id { get; set; }

        public string CompanyName { get; set; }

        public string Position { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Resume { get; set; }

        public string CoverLetter { get; set; }

        public decimal SalaryExpectation { get; set; }

        public bool RequiresVisaSponsorship { get; set; }

        public bool IsEligibleToWork { get; set; }

        public DateTime ApplicationDate { get; set; }
    }
}