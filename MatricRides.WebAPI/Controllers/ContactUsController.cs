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

        [HttpGet("get-messages")]
        public IActionResult GetMessages()
        {
            var result = _contactUs.GetMessages();

            return Ok(result);
        }

        [HttpGet("unread-messages")]
        public IActionResult GetUnreadMessages()
        {
            var result = _contactUs.UnreadMessages();

            return Ok(result);
        }

        [HttpGet("get-message/{id}")]
        public IActionResult GetMessages(int id)
        {
            if(id == 0)
            {
                return BadRequest("Invalid ID");
            }

            var result = _contactUs.GetMessage(id);

            if (result== null)
            {
                return BadRequest("Message does not exist");
            }

            return Ok(result);
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
