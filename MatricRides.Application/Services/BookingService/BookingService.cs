using MatricRides.Application.Services.CarsService;
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
        private readonly Lazy<ICarService> _carService;

        public BookingService(ApplicationDbContext db, IClientService clientService, IHttpService httpService, Lazy<ICarService> carService)
        {
            _db = db;
            _clientService = clientService;
            _httpService = httpService;
            _carService = carService;
        }

        public CarBookingResponseDTO? GetBooking(int id)
        {
            if(id == 0)
            {
                Console.WriteLine("ID cannot be 0");
                return null;
            }

            var booking = _db.Bookings.Find(id);

            if (booking == null)
            {
                Console.WriteLine("Booking does not exist");
                return null;
            }

            var formatBooking = new CarBookingResponseDTO
            {
                BookingId = booking.BookingId,
                CarName = _carService.Value.GetCarByID(booking.CarId),
                Client = _clientService.GetClientViaId(booking.ClientId),
                ClientIDNumber = booking.ClientIDNumber,
                Cost = booking.Cost,
                School = booking.School,
                From = formatDate(booking.From),
                Until = formatDate(booking.Until),
                DateBooked = booking.DateBooked,
                Status = booking.Status.ToString(),
                isDelivery = booking.isDelivery,
                isPickup = booking.isPickup,
            };

            return formatBooking;
        }

        public List<CarBookingResponseDTO> GetBookingsByCarId(int carId)
        {
            if ( carId == 0 )
            {
                Console.WriteLine("Invalid ID");
                return null;
            }

            var bookings = _db.Bookings.Where(x => x.CarId == carId).ToList();
            List<CarBookingResponseDTO> formattedBookings = new List<CarBookingResponseDTO>();

            if (bookings == null)
            {
                Console.WriteLine("There are no bookings for that ID!");
                return null;
            }

            foreach (var b in bookings)
            {
                var formatBookings = new CarBookingResponseDTO
                {
                    BookingId = b.BookingId,
                    CarName = _carService.Value.GetCarByID(b.CarId),
                    Client = _clientService.GetClientViaId(b.ClientId),
                    ClientIDNumber = b.ClientIDNumber,
                    Cost = b.Cost,
                    School = b.School,
                    From = formatDate(b.From),
                    Until = formatDate(b.Until),
                    isDelivery = b.isDelivery,
                    isPickup = b.isPickup,
                    Status = b.Status.ToString(),
                    DateBooked = b.DateBooked,
                };


                formattedBookings.Add(formatBookings);
            }

            return formattedBookings;
        }

        private string formatDate(DateTime date)
        {
            string datePart = date.Date.ToString();
            DateTime dateTime = DateTime.Parse(datePart);

            string formattedDate = dateTime.ToString("yyyy/MM/dd");

            TimeSpan time = date.TimeOfDay;

            return $"{formattedDate} @ {time}";
        }

        //
        //public BookingReviewResponse BookingReview(ReviewApplicationDTO reviewDTO)
        //{
        //    // use bookingId to getBooking via method above
        //    var booking = _db.Bookings.Find(reviewDTO.BookingId);

        //    if (booking == null)
        //    {
        //        return new BookingReviewResponse
        //        {
        //            isReviewed = false,
        //            reviewMessage = "Booking doesnt exist."
        //        };
        //    }

        //    //booking.isPendingApproval = false;
        //    BookingReviewResponse response;
            
        //    if (reviewDTO.ReviewResponse == BookingReviewType.Accept) // accept send 1
        //    {
        //        //booking.isApproved = true;
        //        //booking.isDeclined = false;

        //        response = new BookingReviewResponse
        //        {
        //            isReviewed = true,
        //            isAccepted = true,
        //            reviewMessage = "Booking has been successfully accepted."
        //        };

        //    }
        //    else if(reviewDTO.ReviewResponse == BookingReviewType.Decline) // decline, send 2
        //    {
        //        //booking.isDeclined = true;
        //        //booking.isApproved = false;

        //        if (!string.IsNullOrWhiteSpace(reviewDTO.DeclineReason))
        //        {
        //            booking.DeclinedReason = reviewDTO.DeclineReason;
        //        }

        //        response = new BookingReviewResponse
        //        {
        //            isReviewed = true,
        //            isDeclined = true,
        //            reviewMessage = "Booking has been successfully declined."
        //        };
        //    } 
        //    else
        //    {
        //        response = new BookingReviewResponse
        //        {
        //            isReviewed = false,
        //            reviewMessage = "Invalid review response."
        //        };
        //    }

        //    _db.Bookings.Update(booking);
        //    _db.SaveChanges();

        //    return response;
        //}


        public BookingResponse CreateBooking(BookingDTO bookingModel)
        {
            
            var clientId = _clientService.GetClientIdViaEmail(bookingModel.ClientEmail);

            // booking details
            var booking = new Booking
            {
                CarId = bookingModel.CarId,
                ClientId= clientId,
                ClientIDNumber = bookingModel.ClientIDNumber,
                Cost = bookingModel.Cost,
                School = bookingModel.School,
                From = bookingModel.From,
                Until = bookingModel.Until,
                DateBooked = DateTime.Now
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
