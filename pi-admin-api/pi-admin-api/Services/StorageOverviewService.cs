using pi_admin_api.Models.StorageOverview;
using pi_admin_api.Models.Storage;
using pi_admin_api.Services.Interfaces;

namespace pi_admin_api.Services
{
    public class StorageOverviewService : IStorageOverviewService
    {
        private readonly IStorageService _storageService;
        private readonly IHDSentinelService _hdSentinelService;

        public StorageOverviewService(
            IStorageService storageService,
            IHDSentinelService hdSentinelService)
        {
            _storageService = storageService;
            _hdSentinelService = hdSentinelService;
        }

        public async Task<List<StorageOverviewDto>> GetOverviewAsync()
        {
            var storage = await _storageService.GetSpaceAsync();
            var sentinel = await _hdSentinelService.GetDiskStatusAsync();

            var result = new List<StorageOverviewDto>();

            foreach (var drive in storage)
            {
                var disk = sentinel.Disks.FirstOrDefault(x =>
                    IsSameDisk(drive.Device, x.Device));

                result.Add(new StorageOverviewDto
                {
                    Uuid = drive.Uuid,
                    DisplayName = drive.DisplayName,

                    IsConnected = drive.IsConnected,
                    IsMounted = drive.IsMounted,

                    Device = drive.Device,
                    MountPoint = drive.MountPoint,

                    UsedPercent = drive.UsedPercent,
                    UsedText = drive.UsedText,
                    FreeText = drive.FreeText,
                    TotalText = drive.TotalText,

                    HealthPercent = disk?.HealthPercent,
                    TemperatureC = disk?.TemperatureC,
                    PowerOnHours = disk?.PowerOnHours,
                    Model = disk?.Model,
                    SerialNumber = disk?.SerialNumber,
                    Interface = disk?.Interface
                });
            }

            return result;
        }

        public async Task<StorageOverviewDto?> GetByUuidAsync(string uuid)
        {
            var drives = await GetOverviewAsync();

            return drives.FirstOrDefault(x =>
                string.Equals(x.Uuid, uuid, StringComparison.OrdinalIgnoreCase));
        }

        private static bool IsSameDisk(string? storageDevice, string? sentinelDevice)
        {
            if (string.IsNullOrWhiteSpace(storageDevice) ||
                string.IsNullOrWhiteSpace(sentinelDevice))
            {
                return false;
            }

            return GetDiskDevice(storageDevice) == GetDiskDevice(sentinelDevice);
        }

        private static string GetDiskDevice(string device)
        {
            // /dev/sda2 -> /dev/sda
            // /dev/sdb1 -> /dev/sdb

            return System.Text.RegularExpressions.Regex.Replace(
                device,
                @"\d+$",
                "");
        }
    }
}
