﻿using MatricRides.Domain.DTOs;
using MatricRides.Domain.Enums;
using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.BookingService
{
    public interface IBookingService
    {
        BookingResponse CreateBooking(BookingDTO booking);

        List<CarBookingResponseDTO> GetBookingsByCarId(int carId);

        CarBookingResponseDTO? GetBooking(int id);

        List<ClientBookingsDTO> GetBookingsByClientId(string clientEmail);

        DeleteBookingResponse DeleteBooking(int id);

        List<CarBookingResponseDTO> BookingsStatusFilter(BookingsFilterDTO filterModel);

        List<CarBookingResponseDTO> CompleteBookingsFilters(int carId);
        List<CarBookingResponseDTO> BookedBookingsFilters(int carId);
        List<CarBookingResponseDTO> InProgressBookingsFilter(int carId);

        string formatDate(DateTime date);
    }
}
