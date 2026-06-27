using pi_admin_api.Models.Auth;

namespace pi_admin_api.Services.Interfaces;

public interface IAuthService
{
    Task<LoginResponse?> LoginAsync(LoginRequest request);
}