using MatricRides.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using MatricRides.Application.Services.HostService;

namespace MatricRides.Application.Services.CarsService
{
    public class CarService : ICarService
    {
        private readonly ApplicationDbContext _db;
        private readonly IHostService _hostService;

        public CarService(ApplicationDbContext db, IHostService hostService)
        {
            _db = db;
            _hostService = hostService;
        }

        
        public List<Car> GetCars()
        {
            var getHosts = _hostService.GetHosts();
            List<Car> cars = new List<Car>();

            foreach(var host in getHosts)
            {
                cars.Add(host.Cars.FirstOrDefault());
            }

            return cars;
        }

        // get host from car hostId property
        // need images as well - write a getHost by ID in Host API

        public HostApprovalResponse GetCarInfo(int id)
        {
            var host = _hostService.GetHostViaID(id);

            return host;
        }
    }
}
