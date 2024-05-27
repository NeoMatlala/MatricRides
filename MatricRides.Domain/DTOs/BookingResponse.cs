using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class BookingResponse
    {
        public bool IsBooked { get; set; }
        public string Message { get; set; }
    }
}
