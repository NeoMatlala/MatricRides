using MatricRides.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.HostService
{
    public interface IHostService
    {
        HostApprovalResponse GetHost(string email);
    }
}
