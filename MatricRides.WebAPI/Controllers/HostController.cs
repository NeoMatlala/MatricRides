using MatricRides.Application.Services.HostService;
using MatricRides.Domain.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostController : ControllerBase
    {
        private readonly IHostService _hostService;

        public HostController(IHostService hostService)
        {
            _hostService = hostService;
        }

        // update host
        [HttpPut("upate-host-details/{id}")]
        public IActionResult UpdateHost(int id, [FromForm] UpdateHostDTO model, IFormFile? image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _hostService.UpdateHost(id, model, image);

            return Ok(result);
        }

        // get hosts
        [HttpGet("get-all-hosts")]
        public IActionResult GetHosts()
        {
            var result = _hostService.GetHosts();

            if(result == null)
            {
                return BadRequest("No hosts");
            }

            return Ok(result);
        }

        [HttpGet("get-car/{make}/{id}/{year}")]
        public IActionResult GetCar(int id)
        {
            var result = _hostService.GetCar(id);

            if (result == null)
            {
                return BadRequest("Car unavailable");
            }

            return Ok(result);
        }


        // get host via email
        [HttpGet("get-host/{email}")]
        public IActionResult GetHost(string email)
        {
            var result = _hostService.GetHost(email);

            if(!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
