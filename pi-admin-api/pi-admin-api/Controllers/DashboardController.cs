using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pi_admin_api.Models;
using pi_admin_api.Models.Dashboard;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Controllers
{
    [ApiController]
    [Route("api/dashboard")]
    [Authorize]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardService _dashboardService;

        public DashboardController(IDashboardService dashboardService)
        {
            _dashboardService = dashboardService;
        }

        [HttpGet("storage")]
        public async Task<IActionResult> GetStorage()
        {
            var result = await _dashboardService.GetStorageAsync();

            return Ok(ApiResponse<List<DashboardStorageDto>>.Ok(result));
        }
    }
}
