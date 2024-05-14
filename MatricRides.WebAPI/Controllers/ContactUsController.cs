using MatricRides.Application.Services.ContactUsService;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactUsController : ControllerBase
    {
        private readonly IContactUsService _contactUs;

        public ContactUsController(IContactUsService contactUs)
        {
            _contactUs = contactUs;
        }

        [HttpPost("send-message")]
        public IActionResult SendMessage([FromBody] ContactUsDTO messageBody)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest("Error in message request");
            }

            var result = _contactUs.SendMessage(messageBody);

            return Ok(result);
        }
    }
}
