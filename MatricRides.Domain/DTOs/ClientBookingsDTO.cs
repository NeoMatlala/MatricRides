using MatricRides.Domain.Enums;
using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class ClientBookingsDTO
    {
        public int BookingId { get; set; }
        public Car Car { get; set; }
        public string From { get; set; }
        public string Until { get; set; }
        public bool isDelivery { get; set; } = false;
        public bool isPickup { get; set; } = false;
        public string Status { get; set; }
    }
}
