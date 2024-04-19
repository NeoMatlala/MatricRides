using MatricRides.Application.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // get all users with roles
        [HttpGet("get-users")]
        public async Task<IActionResult> RegisterAsync()
        {
            var result = await _userService.GetALlUsersWithRolesAsync();

            return Ok(result);
        }
    }
}
