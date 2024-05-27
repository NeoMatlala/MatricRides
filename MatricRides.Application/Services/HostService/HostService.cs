using MatricRides.Application.Services.HttpService;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
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
        private readonly IHttpService _httpService;

        public HostService(ApplicationDbContext db, IHttpService httpService)
        {
            _db = db;
            _httpService = httpService;
        }

        // update host
        public HostApprovalResponse UpdateHost(int id, int addressId, UpdateHostDTO model, IFormFile? image)
        {
            if(id == 0)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Invalid ID"
                };
            }

            try
            {
                var host = _db.Hosts.Find(id);

                if (host == null)
                {
                    return new HostApprovalResponse
                    {
                        IsSuccess = false,
                        Message = $"No host with ID: {id}"
                    };
                }

                if(!string.IsNullOrEmpty(model.Surname))
                {
                    host.Surname = model.Surname;
                }

                if (!string.IsNullOrEmpty(model.Email))
                {
                    host.Email = model.Email;
                }

                if (!string.IsNullOrEmpty(model.Name))
                {
                    host.Name = model.Name;
                }

                if(image != null)
                {
                    using (MemoryStream stream = new MemoryStream())
                    {
                        image.CopyTo(stream);

                        host.ProfilePicture = stream.ToArray();
                    }
                }

                _db.Hosts.Update(host);
                _db.SaveChanges();

                // if address exists: send new formatted address with address ID
                // parameters: addressID & formatted address

                if(!string.IsNullOrEmpty(model.UpdatedFormattedAddress))
                {
                    HostApprovalResponse updateCarAddress = _httpService.UpdateCarAddress(addressId, model.UpdatedFormattedAddress).Result;
                }

                return new HostApprovalResponse
                {
                    IsSuccess = true,
                    Message = "Host updated"
                };
            }
            catch(Exception ex)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = $"Error updating host: {ex.Message}"
                };
            }
        }

        // get approved hosts
        public List<Host> GetHosts()
        {
            var hosts = _db.Hosts.Include(c => c.Cars).ThenInclude(i => i.Images).Where(x => x.IsApproved == true).ToList();

            return hosts;
        }

        // Get host via ID with cars
        public Host GetCar(int id)
        {
            var car = _db.Hosts
                .Include(c => c.Cars).ThenInclude(i => i.Images)
                .Include(c => c.Cars).ThenInclude(i => i.Address)
                .FirstOrDefault(x => x.HostId == id);

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

            var host = _db.Hosts
                .Include(c => c.Cars).ThenInclude(i => i.Images )
                .Include(c => c.Cars).ThenInclude(a => a.Address).
                FirstOrDefault(c => c.Email == email);

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
