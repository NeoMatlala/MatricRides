using MatricRides.Application.Services.HttpService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HttpController : ControllerBase
    {
        private readonly IHttpService _httpService;

        public HttpController(IHttpService httpService)
        {
            _httpService = httpService;
        }

        //[HttpGet("fetch-data")]
        //public async Task<IActionResult> FetchData(string address)
        //{
        //    if(string.IsNullOrWhiteSpace(address))
        //    {
        //        return BadRequest("Address cannot be empty");
        //    }

        //    var result = await _httpService.GetAddressDetailsAsync(address);

        //    return Ok(result);
        //}
    }
}
