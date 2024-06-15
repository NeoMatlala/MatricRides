using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class DeleteBookingResponse
    {
        public bool isDeleted { get; set; }
        public string Message { get; set; }
    }
}
