using pi_admin_api.Models.Dashboard;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IStorageOverviewService _storageOverviewService;

        public DashboardService(IStorageOverviewService storageOverviewService)
        {
            _storageOverviewService = storageOverviewService;
        }

        public async Task<List<DashboardStorageDto>> GetStorageAsync()
        {
            var drives = await _storageOverviewService.GetOverviewAsync();

            return drives.Select(drive => new DashboardStorageDto
            {
                Uuid = drive.Uuid,
                DisplayName = drive.DisplayName,
                IsMounted = drive.IsMounted,
                UsedPercent = drive.UsedPercent,
                HealthPercent = drive.HealthPercent
            }).ToList();
        }
    }
}
