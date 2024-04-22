using MatricRides.Application.Services.HostService;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.SearchService
{
    public class SearchService : ISearchService
    {
        private readonly ApplicationDbContext _db;
        private readonly IHostService _hostService;

        public SearchService(ApplicationDbContext db, IHostService hostService)
        {
            _db = db;
            _hostService = hostService;
        }

        public SearchResponse getCarsViaCity(string city)
        {
            var cars = _db.Cars.Include(i => i.Images).Where(c => c.City == city).ToList();

            var allCars = _db.Cars.Include(i => i.Images).ToList();

            //if 

            if(city == "all")
            {
                return new SearchResponse
                {
                    searchSuccess = false,
                    Message = "See all cars",
                    Cars = allCars
                };
            } 
            else if (cars.Count == 0)
            {
                return new SearchResponse
                {
                    searchSuccess = false,
                    Message = $"Unfortunatey, there are currently no cars in '{city}', see all cars",
                    Cars = allCars
                };
            }

            return new SearchResponse
            {
                searchSuccess = true,
                Message = $"Book a car in {city}",
                Cars = cars
            };
        }
    }
}
