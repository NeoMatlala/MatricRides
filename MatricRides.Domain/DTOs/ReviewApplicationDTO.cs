using MatricRides.Domain.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class ReviewApplicationDTO
    {
        public int BookingId { get; set; }
        public BookingReviewType ReviewResponse { get; set; }
        public string? DeclineReason { get; set; }
    }
}
