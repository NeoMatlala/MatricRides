using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.HostApprovalService
{
    public interface IHostApprovalService
    {
        Task<HostApprovalResponse> HostApproval(HostDTO model);

        List<Host> GetHostsAwaitingApproval();

        HostApprovalResponse GetHostAwaitingApproval(int id);

        HostApprovalResponse ApproveHost(int id);
    }
}
