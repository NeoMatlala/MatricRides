using MatricRides.Application.Services.SearchService;
using MatricRides.Application.Services.UserService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private ISearchService _searchService;

        public SearchController(ISearchService searchService)
        {
            _searchService = searchService;
        }

        [HttpGet("get-cars")]
        public IActionResult GetCarsViaCity(string city)
        {
            var result = _searchService.getCarsViaCity(city);

            

            return Ok(result);
        }
    }
}
