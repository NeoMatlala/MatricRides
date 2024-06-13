using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.Models
{
    public class Booking
    {
        public int BookingId { get; set; }
        public int CarId { get; set; }
        public int ClientId { get; set; }
        public int DeliveryAddressId { get; set; } = 0;
        public int PaymentId { get; set; } = 0;
        public string ClientIDNumber { get; set; }
        public string Cost { get; set; }
        public string School { get; set; }
        public DateTime From { get; set; }
        public DateTime Until { get; set; }
        //public bool isPendingApproval { get; set; } = true;
        public bool isDelivery { get; set; } = false;
        public bool isPickup { get; set; } = false;
        //public bool isApproved { get; set; } = false;
        //public bool isDeclined { get; set; } = false;
        //public string? DeclinedReason { get; set; }

        //public Car Car { get; set; }

        // navigation to addresses
        // navigation to clients
        // navigation to payments
    }
}
