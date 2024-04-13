using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MatricRides.Domain.Models;

namespace MatricRides.Domain.DTOs
{
    public class isApprovedResponse
    {
        public string Message { get; set; }
        public bool isVerified { get; set; }
        public Host? hostObj { get; set; }
    }
}
