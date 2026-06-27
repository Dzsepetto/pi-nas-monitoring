using Microsoft.AspNetCore.Mvc;
using pi_admin_api.Models;
using pi_admin_api.Models.Auth;
using pi_admin_api.Services.Interfaces;

namespace YourProject.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var result = await _authService.LoginAsync(request);

        if (result == null)
        {
            return Unauthorized(
                ApiResponse<LoginResponse>.Fail(
                    "USER_NOT_FOUND",
                    "Nincs ilyen felhasználó."
                )
            );
        }

        return Ok(
            ApiResponse<LoginResponse>.Ok(result)
        );
    }
}