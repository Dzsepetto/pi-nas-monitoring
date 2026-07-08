using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pi_admin_api.Models;
using pi_admin_api.Models.StorageOverview;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Controllers
{
    [ApiController]
    [Route("api/storage")]
    [Authorize]
    public class StorageOverviewController : ControllerBase
    {
        private readonly IStorageOverviewService _storageOverviewService;

        public StorageOverviewController(IStorageOverviewService storageOverviewService)
        {
            _storageOverviewService = storageOverviewService;
        }

        [HttpGet]
        public async Task<IActionResult> GetOverview()
        {
            var overview = await _storageOverviewService.GetOverviewAsync();

            return Ok(ApiResponse<List<StorageOverviewDto>>.Ok(overview));
        }

        [HttpGet("{uuid}")]
        public async Task<IActionResult> GetStorageByUuid(string uuid)
        {
            var result = await _storageOverviewService.GetByUuidAsync(uuid);


            return Ok(ApiResponse<StorageOverviewDto>.Ok(result));
        }
    }
}