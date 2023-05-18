using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using AutoMapper;

namespace API.Profiles
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<JobRequestDto, Job>()
                .ForMember(dest => dest.User, opt => opt.MapFrom(src => new User
                {
                    Id = Guid.Parse(src.UserId),
                    Email = src.UserEmail,
                    PasswordHash = src.UserPasswordHash,
                    CompanyName = src.UserCompanyName
                }));
        }
    }
}