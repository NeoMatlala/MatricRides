using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class BookingReviewResponse
    {
        public bool isReviewed { get; set; }
        public bool? isAccepted { get; set; }
        public bool? isDeclined { get; set; }
        public string reviewMessage { get; set; }
    }
}
