using MatricRides.Application.Services.BookingService;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;

        public BookingController(IBookingService bookingService)
        {
            _bookingService = bookingService;
        }

        [HttpPost("review-booking-application")]
        public IActionResult ReviewBookingApplication([FromBody] ReviewApplicationDTO reviewModelDTO)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = _bookingService.BookingReview(reviewModelDTO);

            if(!result.isReviewed)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet("get-booking/{id}")]
        public IActionResult GetBooking(int id)
        {
            var result = _bookingService.GetBooking(id);

            if (result == null)
            {
                return BadRequest("Could not get booking");
            }

            return Ok(result);
        }

        [HttpPost("make-booking")]
        public IActionResult MakeBooking(BookingDTO bookingModel)
        {
            var result = _bookingService.CreateBooking(bookingModel);

            if( !result.IsBooked )
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
