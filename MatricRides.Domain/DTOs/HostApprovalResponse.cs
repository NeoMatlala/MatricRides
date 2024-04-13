using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class HostApprovalResponse
    {
        public string Message { get; set; }

        public bool IsSuccess { get; set; }

        public IEnumerable<string> Errors { get; set; }

        public Host? hostObj { get; set; }
    }
}
