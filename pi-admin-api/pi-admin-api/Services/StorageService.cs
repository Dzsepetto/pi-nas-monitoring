using pi_admin_api.Models.Storage;
using pi_admin_api.Services.Interfaces;
using System.Diagnostics;
using System.Text.Json;
using System.IO;

namespace pi_admin_api.Services;

public class StorageService : IStorageService
{
    public async Task<List<StorageDriveDto>> GetDrivesAsync()
    {
        var output = await RunCommandAsync("lsblk", "-J -o NAME,LABEL,UUID,SIZE,TYPE,MOUNTPOINT,FSTYPE,PATH");

        using var document = JsonDocument.Parse(output);

        var drives = new List<StorageDriveDto>();

        var blockdevices = document.RootElement.GetProperty("blockdevices");

        foreach (var device in blockdevices.EnumerateArray())
        {
            ReadDevice(device, drives);
        }

        return drives;
    }

    private static void ReadDevice(JsonElement device, List<StorageDriveDto> drives)
    {
        var type = GetString(device, "type");

        if (type == "disk" || type == "part")
        {
            var mountPoint = GetString(device, "mountpoint");

            drives.Add(new StorageDriveDto
            {
                Name = GetString(device, "name") ?? "",
                Device = GetString(device, "path") ?? "",
                Size = GetString(device, "size") ?? "",
                Type = type ?? "",
                MountPoint = mountPoint,
                IsMounted = !string.IsNullOrWhiteSpace(mountPoint),
                FileSystem = GetString(device, "fstype"),
                Uuid = GetString(device, "uuid"),
                Label = GetString(device, "label"),
            });
        }

        if (device.TryGetProperty("children", out var children))
        {
            foreach (var child in children.EnumerateArray())
            {
                ReadDevice(child, drives);
            }
        }
    }

    private static string? GetString(JsonElement element, string property)
    {
        if (!element.TryGetProperty(property, out var value))
        {
            return null;
        }

        if (value.ValueKind == JsonValueKind.Null)
        {
            return null;
        }

        return value.GetString();
    }

    private static async Task<string> RunCommandAsync(string command, string arguments)
    {
        var process = new Process
        {
            StartInfo = new ProcessStartInfo
            {
                FileName = command,
                Arguments = arguments,
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false
            }
        };

        process.Start();

        var output = await process.StandardOutput.ReadToEndAsync();
        var error = await process.StandardError.ReadToEndAsync();

        await process.WaitForExitAsync();

        if (process.ExitCode != 0)
        {
            throw new Exception(error);
        }

        return output;
    }

    public async Task<List<MonitoredStorageDto>> GetMonitoredDrivesAsync()
    {
        var drives = await GetDrivesAsync();
        var config = await LoadStorageConfigAsync();

        var result = new List<MonitoredStorageDto>();

        foreach (var item in config)
        {
            var uuid = item.Key;
            var settings = item.Value;

            var drive = drives.FirstOrDefault(x =>
                string.Equals(x.Uuid, uuid, StringComparison.OrdinalIgnoreCase)
            );

            result.Add(new MonitoredStorageDto
            {
                Uuid = uuid,
                DisplayName = settings.DisplayName,

                IsConfigured = true,
                IsConnected = drive != null,
                IsMounted = drive?.IsMounted ?? false,

                Name = drive?.Name,
                Device = drive?.Device,
                Size = drive?.Size,
                Type = drive?.Type,
                MountPoint = drive?.MountPoint,
                FileSystem = drive?.FileSystem
            });
        }

        return result;
    }

    private static async Task<Dictionary<string, StorageConfigItem>> LoadStorageConfigAsync()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Data", "storageConfig.json");

        if (!File.Exists(path))
        {
            return new Dictionary<string, StorageConfigItem>();
        }

        var json = await File.ReadAllTextAsync(path);

        return JsonSerializer.Deserialize<Dictionary<string, StorageConfigItem>>(
            json,
            new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }
        ) ?? new Dictionary<string, StorageConfigItem>();
    }

    public async Task<List<StorageSpaceDto>> GetSpaceAsync()
    {
        const string sysUuid = "d4cc7d63-da78-48ad-9bdd-64ffbba449a8";

        var drives = await GetDrivesAsync();
        var config = await LoadStorageConfigAsync();

        var monitoredUuids = config.Keys
            .Append(sysUuid)
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        var result = new List<StorageSpaceDto>();

        foreach (var uuid in monitoredUuids)
        {
            var drive = drives.FirstOrDefault(x =>
                string.Equals(x.Uuid, uuid, StringComparison.OrdinalIgnoreCase)
            );

            var displayName = uuid == sysUuid
                ? "Rendszer tárhely"
                : config.TryGetValue(uuid, out var settings)
                    ? settings.DisplayName
                    : uuid;

            var item = new StorageSpaceDto
            {
                Uuid = uuid,
                DisplayName = displayName,
                IsConnected = drive != null,
                IsMounted = drive?.IsMounted ?? false,
                MountPoint = drive?.MountPoint,
                Device = drive?.Device
            };

            if (!string.IsNullOrWhiteSpace(drive?.MountPoint))
            {
                var info = new DriveInfo(drive.MountPoint);

                var total = info.TotalSize;
                var free = info.AvailableFreeSpace;
                var used = total - free;

                item.TotalBytes = total;
                item.FreeBytes = free;
                item.UsedBytes = used;
                item.UsedPercent = total > 0
                    ? Math.Round((double)used / total * 100, 2)
                    : 0;

                item.TotalText = FormatBytes(total);
                item.FreeText = FormatBytes(free);
                item.UsedText = FormatBytes(used);
            }

            result.Add(item);
        }

        return result;
    }
    private static string FormatBytes(long bytes)
    {
        string[] sizes = ["B", "KB", "MB", "GB", "TB", "PB"];

        double len = bytes;
        var order = 0;

        while (len >= 1024 && order < sizes.Length - 1)
        {
            order++;
            len /= 1024;
        }

        return $"{len:0.##} {sizes[order]}";
    }
}

