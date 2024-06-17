using MatricRides.Application.Services.CarsService;
using MatricRides.Application.Services.ClientService;
using MatricRides.Application.Services.HttpService;
using MatricRides.Domain.DTOs;
using MatricRides.Domain.Enums;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Data.Common;
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

        public DeleteBookingResponse DeleteBooking(int id)
        {
            try
            {
                if (id == 0)
                {
                    return new DeleteBookingResponse
                    {
                        isDeleted = false,
                        Message = "Id cannot be 0"
                    };
                }

                var booking = _db.Bookings.Find(id);

                if (booking == null)
                {
                    return new DeleteBookingResponse
                    {
                        isDeleted = false,
                        Message = "Booking could not be found"
                    };
                }

                booking.isDeleted = true;
                _db.Bookings.Update(booking);
                _db.SaveChanges();

                return new DeleteBookingResponse
                {
                    isDeleted = true,
                    Message = "Booking successfully deleted."
                };
            }
            catch (DbException dbEx)
            {
                return new DeleteBookingResponse
                {
                    isDeleted = false,
                    Message = $"Database error occured while trying to delete booking: {dbEx}"
                };
            }
            catch (Exception ex)
            {
                return new DeleteBookingResponse
                {
                    isDeleted = false,
                    Message = $"Unknown error occured while trying to delete booking: {ex}"
                };
            }
        }

        public List<CarBookingResponseDTO> BookingsStatusFilter(BookingsFilterDTO filterModel)
        {
            // get carID
            var bookingsForCarId = GetBookingsByCarId(filterModel.CarId);
            List<CarBookingResponseDTO> filteredBookings = new List<CarBookingResponseDTO>();

            
            if (filterModel.Status == "complete")
            {
                foreach (var booking in bookingsForCarId)
                {
                    if (booking.Status == StatusType.Complete.ToString())
                    {
                        filteredBookings.Add(booking);
                    }
                }
            }
            else if (filterModel.Status == "booked")
            {
                foreach (var booking in bookingsForCarId)
                {
                    if (booking.Status == StatusType.Booked.ToString())
                    {
                        filteredBookings.Add(booking);
                    }
                }
            }
            else if (filterModel.Status == "in-progress")
            {
                foreach (var booking in bookingsForCarId)
                {
                    if (booking.Status == StatusType.InProgress.ToString())
                    {
                        filteredBookings.Add(booking);
                    }
                }
            }

            return filteredBookings;
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

        public List<CarBookingResponseDTO> CompleteBookingsFilters(int carId)
        {
            // get bookings for carID
            var bookingsForCarId = GetBookingsByCarId(carId);

            List<CarBookingResponseDTO> filteredBookings = new List<CarBookingResponseDTO>();

            
            foreach(var b in bookingsForCarId) {
                if (b.Status == StatusType.Complete.ToString())
                {
                    filteredBookings.Add(b);
                }
            }

            return filteredBookings;
        }

        public List<CarBookingResponseDTO> BookedBookingsFilters(int carId)
        {
            // get bookings for carID
            var bookingsForCarId = GetBookingsByCarId(carId);

            List<CarBookingResponseDTO> filteredBookings = new List<CarBookingResponseDTO>();


            foreach (var b in bookingsForCarId)
            {
                if (b.Status == StatusType.Booked.ToString())
                {
                    filteredBookings.Add(b);
                }
            }

            return filteredBookings;
        }

        public List<CarBookingResponseDTO> InProgressBookingsFilter(int carId)
        {
            // get bookings for carID
            var bookingsForCarId = GetBookingsByCarId(carId);

            List<CarBookingResponseDTO> filteredBookings = new List<CarBookingResponseDTO>();


            foreach (var b in bookingsForCarId)
            {
                if (b.Status == StatusType.InProgress.ToString())
                {
                    filteredBookings.Add(b);
                }
            }

            return filteredBookings;
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

        public List<ClientBookingsDTO> GetBookingsByClientId(string clientEmail)
        {
            // get email, get ID from a client service that returns clientId

            int clientId = _clientService.GetClientIdViaEmail(clientEmail);


            if (clientId == 0)
            {
                return null;
            }

            var bookings = _db.Bookings.Where(x => x.ClientId == clientId).Where(d => d.isDeleted == false).ToList();

            if (bookings == null)
            {
                return null;
            }

            List<ClientBookingsDTO> formattedBookings = new List<ClientBookingsDTO>();

            foreach (var booking in bookings)
            {
                // use carID to get Car images, car name, car doors
                //var bookedCar = _carService.

                var formattedBooking = new ClientBookingsDTO
                {
                    BookingId = booking.BookingId,
                    From = formatDate(booking.From),
                    Until = formatDate(booking.Until),
                    Status = booking.Status.ToString(),
                    Car = _carService.Value.GetCarByCarId(booking.CarId),
                    isDelivery = booking.isDelivery,
                    isPickup = booking.isPickup
                };

                formattedBookings.Add(formattedBooking);
            }

            return formattedBookings;

        }


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
