using pi_admin_api.Models.Service;

namespace pi_admin_api.Services.Interfaces
{
    public interface ISystemService
    {
        Task<ServicesStatusResponse> GetServicesStatusAsync();
        Task<bool> ChangeServiceStatusAsync(string serviceName, string wantedStatus);
    }
}
