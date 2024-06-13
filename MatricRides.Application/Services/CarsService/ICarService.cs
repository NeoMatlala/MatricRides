using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using Microsoft.AspNetCore.Http;

namespace MatricRides.Application.Services.CarsService
{
    public interface ICarService
    {
        List<Car> GetCars();
        Car GetCarByCarId(int carId);
        UpdateCarResponse UpdateCar(int id, UpdateCarDTO model, List<IFormFile>? carImages);
        HostApprovalResponse GetCarInfo(int id);

        string GetCarByID(int id);
    }
}
