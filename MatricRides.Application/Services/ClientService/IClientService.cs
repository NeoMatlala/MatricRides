using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.ClientService
{
    public interface IClientService
    {
        int GetClientIdViaEmail(string email);
    }
}
