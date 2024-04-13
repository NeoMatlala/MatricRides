using MatricRides.Application.Services.HostApprovalService;
using MatricRides.Application.Services.UserService;
using MatricRides.Domain.DTOs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MatricRides.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HostApprovalController : ControllerBase
    {
        private IHostApprovalService _hostApprovalService;

        public HostApprovalController(IHostApprovalService hostApprovalService)
        {
            _hostApprovalService = hostApprovalService;
        }

        // check verification
        [HttpGet("check-approval")]
        public IActionResult CheckApproval(string email)
        {
            var result = _hostApprovalService.CheckHostApproval(email);

            //if( !result.isVerified)
            //{
            //    return BadRequest(result);
            //}

            return Ok(result);
        }

        // approve host
        [HttpPut("approve-host/{id}")]
        public IActionResult ApproveHost(int id)
        {
            var result = _hostApprovalService.ApproveHost(id);

            if ( !result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        // get hosts
        [HttpGet("get-hosts-awaiting-approval")]
        public IActionResult GetHostsAwaitingApproval()
        {
            var result = _hostApprovalService.GetHostsAwaitingApproval();

            return Ok(result);
        }

        [HttpGet("get-host-awaiting-approval/{id}")]
        public IActionResult GetHostAwaitingApproval(int id)
        {
            var result = _hostApprovalService.GetHostAwaitingApproval(id);

            if(!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }


        // create host application
        [HttpPost("submit-host-application")]
        public async Task<IActionResult> SubmitHostApplication([FromBody] HostDTO model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _hostApprovalService.HostApproval(model);

            if(!result.IsSuccess)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
    }
}
