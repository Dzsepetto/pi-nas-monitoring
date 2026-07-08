using pi_admin_api.Models.StorageOverview;
namespace pi_admin_api.Services.Interfaces
{
    public interface IStorageOverviewService
    {
        Task<List<StorageOverviewDto>> GetOverviewAsync();
        Task<StorageOverviewDto?> GetByUuidAsync(string uuid);
    }
}
