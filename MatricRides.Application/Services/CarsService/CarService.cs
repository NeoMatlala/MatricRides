using MatricRides.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using MatricRides.Application.Services.HostService;
using Microsoft.AspNetCore.Http;

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

        public string GetCarByID(int id)
        {
            if (id == 0)
            {
                return "ID can't be zero";
            }

            var car = _db.Cars.Find(id);

            if (car == null)
            {
                return "Car doesn't exist";
            }

            var carName = $"{car.Year} {car.Make} {car.Model}";

            return carName;
        }

        // update car details including images
        public UpdateCarResponse UpdateCar(int id, UpdateCarDTO model, List<IFormFile>? carImages)
        {
            if (id == 0)
            {
                return new UpdateCarResponse
                {
                    IsUpdated = false,
                    Message = " Invalid ID"
                };
            }

            try
            {
                var car = _db.Cars.Find(id);

                if (car == null)
                {
                    return new UpdateCarResponse
                    {
                        IsUpdated = false,
                        Message = $"No user with ID : {id}"
                    };
                }

                // images
                // get images associated with ID
                var currentImages = _db.Images.Where(x => x.CarId == id).ToList();

                // IF: no images exist in the table - add new images

                if (currentImages.Count == 0)
                {
                    foreach (var carImage in carImages)
                    {
                        using (MemoryStream stream = new MemoryStream())
                        {
                            carImage.CopyTo(stream);

                            var imageEntity = new Image
                            {
                                CarId = car.CarId,
                                CarImage = stream.ToArray()
                            };

                            _db.Images.Add(imageEntity);
                        }
                    }
                    _db.SaveChanges();
                } 
                else
                {
                    // ELSE: replace all with new set. FE must send new FULL set of images
                    // 1. delete existing (currentImages) own foreach
                    foreach(var image in currentImages)
                    {
                        _db.Images.Remove(image);
                    }

                    foreach (var carImage in carImages)
                    {
                        using (MemoryStream stream = new MemoryStream())
                        {
                            carImage.CopyTo(stream);

                            var imageEntity = new Image
                            {
                                CarId = car.CarId,
                                CarImage = stream.ToArray()
                            };

                            _db.Images.Add(imageEntity);
                        }
                    }

                    _db.SaveChanges();
                }

                // add new to images

                if (!string.IsNullOrEmpty(model.Make))
                {
                    car.Make = model.Make;
                }

                if (!string.IsNullOrEmpty(model.Model))
                {
                    car.Model = model.Model;
                }

                if (!string.IsNullOrEmpty(model.Year))
                {
                    car.Year = model.Year;
                }

                if (!string.IsNullOrEmpty(model.Color))
                {
                    car.Color = model.Color;
                }

                if (!string.IsNullOrEmpty(model.Doors))
                {
                    car.Doors = model.Doors;
                }

                if (!string.IsNullOrEmpty(model.FuelType))
                {
                    car.FuelType = model.FuelType;
                }

                if (!string.IsNullOrEmpty(model.HourlyRate))
                {
                    car.HourlyRate = model.HourlyRate;
                }

                //if (!string.IsNullOrEmpty(model.City))
                //{
                //    car.City = model.City;
                //}

                if (!string.IsNullOrEmpty(model.Descripion))
                {
                    car.Descripion = model.Descripion;
                }

                //if (!string.IsNullOrEmpty(model.Province))
                //{
                //    car.Province = model.Province;
                //}

                _db.Cars.Update(car);
                _db.SaveChanges();

                return new UpdateCarResponse
                {
                    IsUpdated = true,
                    Message = "Car info successfully updated"
                };
            }
            catch (Exception ex)
            {
                return new UpdateCarResponse
                {
                    IsUpdated = false,
                    Message = $" Error updating car: {ex.Message}"
                };
            }
        }
    }
}
