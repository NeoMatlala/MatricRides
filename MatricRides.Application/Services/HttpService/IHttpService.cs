using MatricRides.Domain.DTOs;
using MatricRides.Domain.Enums;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.HttpService
{
    public interface IHttpService
    {
        Task<int> GetAddressDetailsAsync(string address, int hostId, AddressType addressType);

        Task<HostApprovalResponse> UpdateCarAddress(int addressId, string address);
    }
}
