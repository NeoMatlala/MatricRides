using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace MatricRides.Domain.DTOs
{
    public class ApplicationUsers : IdentityUser
    {
        public string EmailAddress { get; set; }

    }
}
