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
