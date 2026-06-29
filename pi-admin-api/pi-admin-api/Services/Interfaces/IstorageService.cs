using pi_admin_api.Models.Storage;

namespace pi_admin_api.Services.Interfaces
{
    public interface IStorageService
    {
        Task<List<StorageDriveDto>> GetDrivesAsync();
        Task<List<MonitoredStorageDto>> GetMonitoredDrivesAsync();
        Task<List<StorageSpaceDto>> GetSpaceAsync();
    }
}
