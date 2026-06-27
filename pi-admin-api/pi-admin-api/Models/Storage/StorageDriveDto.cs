namespace pi_admin_api.Models.Storage
{
    public class StorageDriveDto
    {
        public string Name { get; set; } = string.Empty;
        public string Device { get; set; } = string.Empty;
        public string Size { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public string? MountPoint { get; set; }
        public bool IsMounted { get; set; }
        public string? FileSystem { get; set; }
        public string? Uuid { get; set; }
        public string? Label { get; set; }
    }

    public class StorageConfigItem
    {
        public string DisplayName { get; set; } = string.Empty;
    }

    public class MonitoredStorageDto
    {
        public string Uuid { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;

        public bool IsConfigured { get; set; }
        public bool IsConnected { get; set; }
        public bool IsMounted { get; set; }

        public string? Name { get; set; }
        public string? Device { get; set; }
        public string? Size { get; set; }
        public string? Type { get; set; }
        public string? MountPoint { get; set; }
        public string? FileSystem { get; set; }
    }
}
