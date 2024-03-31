using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.Models
{
    public class Message
    {
        public int MessageId { get; set; }
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Subject { get; set; }
        public string MessageBody { get; set; }
        public bool IsRead { get; set; } = false;
    }
}
