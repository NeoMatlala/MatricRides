using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class StripeSessionDTO
    {
        public double Cost { get; set; }
        public string ClientEmail { get; set; }
        public string CarName { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime UntilDate { get; set; }
    }
}
