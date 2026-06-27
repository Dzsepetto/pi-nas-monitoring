using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pi_admin_api.Models;
using pi_admin_api.Models.Service;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/system")]
    public class SystemController : ControllerBase
    {
        private readonly ISystemService _systemService;

        public SystemController(ISystemService systemService)
        {
            _systemService = systemService;
        }

        [HttpGet("services/status")]
        public async Task<IActionResult> GetServicesStatus()
        {
            var result = await _systemService.GetServicesStatusAsync();

            return Ok(ApiResponse<ServicesStatusResponse>.Ok(result));
        }
    }
}
