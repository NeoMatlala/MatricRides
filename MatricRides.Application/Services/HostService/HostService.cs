using MatricRides.Domain.DTOs;
using MatricRides.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.HostService
{
    public class HostService : IHostService
    {
        private readonly ApplicationDbContext _db;

        public HostService(ApplicationDbContext db)
        {
            _db = db;
        }

        // get host
        public HostApprovalResponse GetHost(string email)
        {
            if(string.IsNullOrEmpty(email))
            {
                return new HostApprovalResponse
                {
                    Message = "Invalid email address",
                    IsSuccess = false
                };
            }

            var host = _db.Hosts.Include(c => c.Cars).FirstOrDefault(c => c.Email == email);

            if (host == null)
            {
                return new HostApprovalResponse
                {
                    Message = "No host is assocciated with that email address",
                    IsSuccess = false
                };
            }

            return new HostApprovalResponse
            {
                Message = "Host found",
                IsSuccess = true,
                hostObj = host
            };
        }
    }
}
