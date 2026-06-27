using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Controllers;

[ApiController]
[Route("api/system/storage")]
[Authorize]
public class StorageController : ControllerBase
{
    private readonly IStorageService _storageService;

    public StorageController(IStorageService storageService)
    {
        _storageService = storageService;
    }

    [HttpGet]
    public async Task<IActionResult> GetStorage()
    {
        var storages = await _storageService.GetMonitoredDrivesAsync();

        return Ok(new
        {
            success = true,
            data = new
            {
                storages
            }
        });
    }
}