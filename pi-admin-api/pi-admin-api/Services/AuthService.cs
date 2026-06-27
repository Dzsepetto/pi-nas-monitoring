using Microsoft.IdentityModel.Tokens;
using pi_admin_api.Models.Auth;
using pi_admin_api.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Text.Json;

namespace YourProject.Services;

public class AuthService : IAuthService
{
    private readonly IConfiguration _configuration;
    private readonly IWebHostEnvironment _environment;

    public AuthService(IConfiguration configuration, IWebHostEnvironment environment)
    {
        _configuration = configuration;
        _environment = environment;
    }

    public async Task<LoginResponse?> LoginAsync(LoginRequest request)
    {
        var users = await LoadUsersAsync();

        var userExists = users.Any(u =>
            u.Username.Equals(request.Username, StringComparison.OrdinalIgnoreCase)
        );

        if (!userExists)
        {
            return null;
        }

        var token = GenerateJwtToken(request.Username);

        return new LoginResponse
        {
            Token = token
        };
    }

    private async Task<List<LocalUser>> LoadUsersAsync()
    {
        var path = Path.Combine(_environment.ContentRootPath, "Data", "users.json");

        if (!File.Exists(path))
        {
            return new List<LocalUser>();
        }

        var json = await File.ReadAllTextAsync(path);

        return JsonSerializer.Deserialize<List<LocalUser>>(json, new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        }) ?? new List<LocalUser>();
    }

    private string GenerateJwtToken(string username)
    {
        var jwtKey = _configuration["Jwt:Key"];

        if (string.IsNullOrWhiteSpace(jwtKey))
        {
            throw new Exception("Jwt:Key nincs beállítva.");
        }

        var claims = new[]
        {
            new Claim(ClaimTypes.Name, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(jwtKey)
        );

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256
        );

        var expires = DateTime.UtcNow.AddMinutes(
            Convert.ToDouble(_configuration["Jwt:ExpiresInMinutes"])
        );

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expires,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}