using MatricRides.Domain.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.UserService
{
    public interface IUserService
    {
        Task<UserManagerResponse> RegisterUserAsync(RegisterDTO model);
        Task<UserManagerResponse> LoginUserAsync(LoginDTO model);
        Task<List<UserWithRoles>> GetALlUsersWithRolesAsync();
    }
}
