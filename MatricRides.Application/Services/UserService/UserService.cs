using MatricRides.Domain.DTOs;
using MatricRides.Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.UserService
{
    public class UserService : IUserService
    {
        private IConfiguration _configuration;
        private UserManager<IdentityUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public UserService(IConfiguration configuration, UserManager<IdentityUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _configuration = configuration;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<UserWithRoles>> GetALlUsersWithRolesAsync()
        {
            var usersWithRoles = new List<UserWithRoles>();

            var users = await _userManager.Users.Where(x => x.UserName != "admin@mrides.com").ToListAsync();

            foreach(var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                usersWithRoles.Add(new UserWithRoles
                {
                    Email = user.Email,
                    Role = roles.FirstOrDefault()
                });
            }

            return usersWithRoles;
        }

        public async Task<UserManagerResponse> RegisterUserAsync(RegisterDTO model)
        {
            if (model == null)
            {
                throw new NullReferenceException("Register Model is null");
            }

            if (model.Password != model.ConfirmPassword)
            {
                return new UserManagerResponse
                {
                    Message = "Passwords do not match",
                    IsSuccess = false
                };
            }

            var identityUser = new IdentityUser
            {
                Email = model.Email,
                UserName = model.Email
            };

            var result = await _userManager.CreateAsync(identityUser, model.Password);

            if (result.Succeeded)
            {

                // assign host role
                await _userManager.AddToRoleAsync(identityUser, model.Role);


                return new UserManagerResponse
                {
                    Message = "User created successfully",
                    IsSuccess = true
                };
            }

            return new UserManagerResponse
            {
                Message = "Could not register user",
                IsSuccess = false,
                Errors = result.Errors.Select(e => e.Description)
            };

        }

        public async Task<UserManagerResponse> LoginUserAsync(LoginDTO model)
        {
            // check user
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null)
            {
                return new UserManagerResponse
                {
                    Message = "User does not exist",
                    IsSuccess = false
                };
            }

            // check password
            var result = await _userManager.CheckPasswordAsync(user, model.Password);

            if (!result)
            {
                return new UserManagerResponse
                {
                    Message = "Incorrect Password",
                    IsSuccess = false
                };
            }

            // get role(s)
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new[]
            {
                new Claim(ClaimTypes.Email, model.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Role, string.Join(",", roles))
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["AuthSettings:Key"]));

            // generate jwt token
            var token = new JwtSecurityToken(
                issuer: _configuration["AuthSettings:Issuer"],
                audience: _configuration["AuthSettings:Audience"],
                claims: claims,
                expires: DateTime.Now.AddDays(30),
                signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );

            var tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

            return new UserManagerResponse
            {
                Message = tokenAsString,
                IsSuccess = true,
                ExpireDate = token.ValidTo,
                UserId = user.Id,
                Roles = roles
            };
        }
    }
}
