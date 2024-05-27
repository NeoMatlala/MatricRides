using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class BookingDTO
    {
        // client details
        public string ClientEmail { get; set; }

        // booking details
        public int CarId { get; set; }
        //public int ClientId { get; set; }
        public string ClientIDNumber { get; set; }
        public string Cost { get; set; }
        public string School { get; set; }
        public DateTime From { get; set; }
        public DateTime Until { get; set; }
        public string? DeliveryAddress { get; set; }
    }
}
