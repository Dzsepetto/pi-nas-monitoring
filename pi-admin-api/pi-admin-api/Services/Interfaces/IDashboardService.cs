using pi_admin_api.Models.Dashboard;

namespace pi_admin_api.Services.Interfaces
{
    public interface IDashboardService
    {
        Task<List<DashboardStorageDto>> GetStorageAsync();
    }
}
