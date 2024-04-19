using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class UserWithRoles
    {
        //public ApplicationUsers User { get; set; }

        public string Email { get; set; }
        public string Role { get; set; }
    }
}
