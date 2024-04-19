using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;

namespace MatricRides.Application.Services.CarsService
{
    public interface ICarService
    {
        List<Car> GetCars();

        HostApprovalResponse GetCarInfo(int id);
    }
}
