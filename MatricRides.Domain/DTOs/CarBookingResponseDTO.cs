using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class CarBookingResponseDTO
    {
        public int BookingId { get; set; }
        public string CarName { get; set; } // concat year make model
        public string ClientIDNumber { get; set; }
        public Client Client { get; set; }
        public string Cost { get; set; }
        public string School { get; set; }
        public string From { get; set; }
        public string Until { get; set; }
        //public bool isPendingApproval { get; set; } = true;
        public bool isDelivery { get; set; } = false;
        public bool isPickup { get; set; } = false;
        //public bool isApproved { get; set; } = false;
        //public bool isDeclined { get; set; } = false;
        //public string? DeclinedReason { get; set; }
    }
}
