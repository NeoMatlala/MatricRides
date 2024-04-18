using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.HostApprovalService
{
    public interface IHostApprovalService
    {
        HostApprovalResponse HostApproval(HostDTO hostDTO, List<IFormFile> carImages, IFormFile? profilePicture);

        List<Host> GetHostsAwaitingApproval();

        HostApprovalResponse GetHostAwaitingApproval(int id);

        HostApprovalResponse ApproveHost(int id);

        isApprovedResponse CheckHostApproval(string email);
    }
}
