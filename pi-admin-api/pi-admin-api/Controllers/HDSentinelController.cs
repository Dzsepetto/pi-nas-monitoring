using Microsoft.AspNetCore.Mvc;
using pi_admin_api.Models;
using pi_admin_api.Models.HDSentinel;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Controllers
{
    [ApiController]
    [Route("api/hdsentinel")]
    public class HDSentinelController : ControllerBase
    {
        private readonly IHDSentinelService _hdSentinelService;

        public HDSentinelController(IHDSentinelService hdSentinelService)
        {
            _hdSentinelService = hdSentinelService;
        }

        [HttpGet("disks")]
        public async Task<IActionResult> GetDisks()
        {
            var result = await _hdSentinelService.GetDiskStatusAsync();
            return Ok(ApiResponse<HdSentinelStatusResponse>.Ok(result));
        }
    }
}
