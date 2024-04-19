﻿using MatricRides.Application.Services.CarsService;
using MatricRides.Application.Services.HostService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }

        [HttpGet("get-cars")]
        public IActionResult GetCars()
        {
            var result = _carService.GetCars();

            return Ok(result);
        }

        [HttpGet("get-car-info/{id}")]
        public IActionResult GetCarinfo(int id)
        {
            var result = _carService.GetCarInfo(id);

            if(!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
