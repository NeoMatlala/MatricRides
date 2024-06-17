using MatricRides.Application.Services.BookingService;
using MatricRides.Application.Services.StripeService;
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
        private readonly IStripeService _stripeService;
        public BookingController(IBookingService bookingService, IStripeService stripeService)
        {
            _bookingService = bookingService;
            _stripeService = stripeService;
        }

        [HttpPost("bookings-filter")]
        public IActionResult GetBookedBookings([FromBody] BookingsFilterDTO filterModel)
        {
            var result = _bookingService.BookingsStatusFilter(filterModel);
            return Ok(result);
        }

        //[HttpGet("booked-bookings")]
        //public IActionResult GetBookedBookings(int carId)
        //{
        //    var result = _bookingService.BookedBookingsFilters(carId);
        //    return Ok(result);
        //}

        //[HttpGet("in-progress-bookings")]
        //public IActionResult GetInProgressBookings(int carId)
        //{
        //    var result = _bookingService.InProgressBookingsFilter(carId);
        //    return Ok(result);
        //}

        //[HttpGet("complete-bookings")]
        //public IActionResult GetCompleteBookings(int carId)
        //{
        //    var result = _bookingService.CompleteBookingsFilters(carId);
        //    return Ok(result);
        //}

        [HttpDelete("delete-booking/{id}")]
        public IActionResult DeleteBooking(int id)
        {
            var result = _bookingService.DeleteBooking(id);

            if (!result.isDeleted)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpGet("get-client-bookings/{clientEmail}")]
        public IActionResult GetClientBookings(string clientEmail)
        {
            if(string.IsNullOrWhiteSpace(clientEmail))
            {
                return BadRequest("email cannot be empty");
            }

            var results = _bookingService.GetBookingsByClientId(clientEmail);

            if ( results == null)
            {
                return BadRequest(results);
            }

            return Ok(results);
        }

        [HttpGet("get-stripe")]
        public async Task<IActionResult> GetProductsAsync()
        {
            var products = await _stripeService.GetProductsAsync(3);

            return Ok(products);
        }

        [HttpPost("get-stripe-sessionId")]
        public async Task<IActionResult> PayCarAsync([FromBody] StripeSessionDTO stripeSessionDto)
        {
            var result = await _stripeService.CreateCheckoutSession(stripeSessionDto);

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
