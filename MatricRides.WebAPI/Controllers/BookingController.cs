﻿using MatricRides.Application.Services.BookingService;
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