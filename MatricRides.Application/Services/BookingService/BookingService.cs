using MatricRides.Application.Services.ClientService;
using MatricRides.Application.Services.HttpService;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Enums;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.BookingService
{
    public class BookingService : IBookingService
    {
        private readonly ApplicationDbContext _db;
        private readonly IClientService _clientService;
        private readonly IHttpService _httpService;

        public BookingService(ApplicationDbContext db, IClientService clientService, IHttpService httpService)
        {
            _db = db;
            _clientService = clientService;
            _httpService = httpService;
        }

        // 1st TODO: CREATE SIMPLE booking from API 
        public BookingResponse CreateBooking(BookingDTO bookingModel)
        {
            
            var clientId = _clientService.GetClientIdViaEmail(bookingModel.ClientEmail);

            // TODO: costs
            // if PICKUP: until - from = int... multiply by hourly rate

            // if DELIVERY  : until - from = int... multiply by hourly rate + DISTANCANCE CALUCALTOR() - DO THIS ON NEW BRANCH.


            // if isDelivery: calculate cost on API with addresses

            // booking details
            var booking = new Booking
            {
                CarId = bookingModel.CarId,
                ClientId= clientId,
                ClientIDNumber = bookingModel.ClientIDNumber,
                Cost = bookingModel.Cost,
                School = bookingModel.School,
                From = bookingModel.From,
                Until = bookingModel.Until
            };

            if (bookingModel.DeliveryAddress != null)
            {
                // add addressID && make
                int addressId = _httpService.GetAddressDetailsAsync(bookingModel.DeliveryAddress, clientId, AddressType.Client).Result;

                if(addressId != 0)
                {
                    booking.isDelivery = true;
                    booking.DeliveryAddressId = addressId;
                }
            }
            else
            {
                booking.isPickup = true;
            }

            try
            {
                _db.Bookings.Add(booking);
                _db.SaveChanges();

                return new BookingResponse
                {
                    IsBooked = true,
                    Message = "The host will review your application shortly. Check your bookings to see the status of your application."
                };
            }
            catch (Exception ex)
            {
                return new BookingResponse
                {
                    IsBooked = false,
                    Message = $"Error creating booking: {ex.Message}"
                };
            }
        }
    }
}
