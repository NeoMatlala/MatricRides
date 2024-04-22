using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
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

        // get hosts
        public List<Host> GetHosts()
        {
            var hosts = _db.Hosts.Include(c => c.Cars).ThenInclude(i => i.Images).Where(x => x.IsApproved == true).ToList();

            return hosts;
        }

        // Get host via ID with cars
        public Host GetCar(int id)
        {
            var car = _db.Hosts.Include(c => c.Cars).ThenInclude(i => i.Images).FirstOrDefault(x => x.HostId == id);

            return car;
        }

        // Get host via ID no cars
        public Host GetCarNoCars(int id)
        {
            var car = _db.Hosts.FirstOrDefault(x => x.HostId == id);

            return car;
        }

        // get host via email
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

            var host = _db.Hosts.Include(c => c.Cars).ThenInclude(i => i.Images ).FirstOrDefault(c => c.Email == email);

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

        // get host via id
        public HostApprovalResponse GetHostViaID(int id)
        {
            if (id == 0)
            {
                return new HostApprovalResponse
                {
                    Message = "Invalid ID",
                    IsSuccess = false
                };
            }

            var host = _db.Hosts.Include(c => c.Cars).ThenInclude(i => i.Images).FirstOrDefault(c => c.HostId == id);

            if (host == null)
            {
                return new HostApprovalResponse
                {
                    Message = "No host is assocciated with that id",
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
