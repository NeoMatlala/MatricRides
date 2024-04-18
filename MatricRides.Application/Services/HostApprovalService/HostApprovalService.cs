using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.HostApprovalService
{
    public class HostApprovalService : IHostApprovalService
    {
        private readonly ApplicationDbContext _db;

        public HostApprovalService(ApplicationDbContext db)
        {
            _db = db;
        }

        public isApprovedResponse CheckHostApproval(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return new isApprovedResponse
                {
                    isVerified = false,
                    Message = "Invalid email address"
                };
            }

            var host = _db.Hosts.Where(e => e.Email == email).FirstOrDefault();

            if (host == null)
            {
                return new isApprovedResponse
                {
                    isVerified = false,
                    Message = "Email address not associated with any host"
                };
            }

            if (host.IsApproved)
            {
                return new isApprovedResponse
                {
                    isVerified = true,
                    Message = "You have been approved!"
                };
            }

            return new isApprovedResponse
            {
                isVerified = false,
                Message = "Host not approved yet, please check back in 24 hours."
            };
        }

        public HostApprovalResponse ApproveHost(int id)
        {
            if( id == 0 )
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Invalid ID."
                };
            }

            try
            {
                var host = _db.Hosts.Find(id);

                if ( host == null )
                {
                    return new HostApprovalResponse
                    {
                        IsSuccess = false,
                        Message = "Host does not exist"
                    };
                }

                host.IsApproved = true;
                _db.Hosts.Update(host);
                _db.SaveChanges();

                return new HostApprovalResponse
                {
                    IsSuccess = true,
                    Message = $"{host.Name} {host.Surname} is successfully approved as a host."
                };
            } 
            catch (Exception ex)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = $"Error approving admin, {ex.Message}"
                };
            }
        }

        public HostApprovalResponse GetHostAwaitingApproval(int id)
        {
            if (id == 0)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Invalid ID",
                };
            }

            try
            {
                var host = _db.Hosts.Include(c => c.Cars).ThenInclude(i => i.Images).Where(x => x.IsApproved == false).FirstOrDefault(h => h.HostId == id);

                if (host == null)
                {
                    return new HostApprovalResponse
                    {
                        IsSuccess = false,
                        Message = "Host not found",
                    };
                }

                return new HostApprovalResponse
                {
                    IsSuccess = true,
                    Message = "host Found",
                    hostObj = host
                };
            }
            catch(Exception ex)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = $"Error getting host: {ex.Message}"
                };
            }
        }

        public List<Host> GetHostsAwaitingApproval()
        {
            var hosts = _db.Hosts
                        .Include(c => c.Cars)
                        .ThenInclude(i => i.Images)
                        .Where(x => x.IsApproved == false)
                        .ToList();

            return hosts;
        }

        public HostApprovalResponse HostApproval(HostDTO hostDTO, List<IFormFile> carImages)
        {
            try
            {
                var host = new Host
                {
                    Name = hostDTO.Name,
                    Surname = hostDTO.Surname,
                    Email = hostDTO.Email
                };

                _db.Hosts.Add(host);
                //await _db.SaveChangesAsync();
                _db.SaveChanges();

                var car = new Car
                {
                    HostId = host.HostId,
                    Make = hostDTO.Make,
                    Model = hostDTO.Model,
                    Year = hostDTO.Year,
                    HourlyRate = hostDTO.HourlyRate,
                    Color = hostDTO.Color,
                    Doors = hostDTO.Doors,
                    FuelType = hostDTO.FuelType,
                    Descripion = hostDTO.Description
                };

                _db.Cars.Add(car);
                _db.SaveChanges();
                //await _db.SaveChangesAsync();

                // add images now that iHave CarId
                if (carImages != null && carImages.Any())
                {
                    foreach(var carImage in carImages)
                    {
                        using(MemoryStream stream = new MemoryStream())
                        {
                            carImage.CopyTo(stream);

                            var imageEntity = new Image
                            {
                                CarId = car.CarId,
                                CarImage = stream.ToArray()
                            };

                            _db.Images.Add(imageEntity);
                            //await _db.SaveChangesAsync();
                            _db.SaveChanges();
                        }
                    }
                }

                return new HostApprovalResponse
                {
                    IsSuccess = true,
                    Message = "Host application successfully submitted, check in 24 Hours for approval on dashboard."
                };
            }
            catch (Exception ex)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = $"Error creating host approval: {ex.Message}"
                };
            }
        }
    }
}
