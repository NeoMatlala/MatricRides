using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class ContactUsResponse
    {
        public string Message { get; set; }
        public bool IsMessageSent { get; set; }
    }
}
