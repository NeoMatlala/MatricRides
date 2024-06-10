using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class SessionIDResponse
    {
        public bool SessionExists { get; set; }
        public string SessionId { get; set; }
        public string? ErrorMessage { get; set; }
    }
}
