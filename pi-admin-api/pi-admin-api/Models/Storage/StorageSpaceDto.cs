namespace pi_admin_api.Models.Storage;

public class StorageSpaceDto
{
    public string Uuid { get; set; } = string.Empty;
    public string DisplayName { get; set; } = string.Empty;

    public bool IsConnected { get; set; }
    public bool IsMounted { get; set; }

    public string? MountPoint { get; set; }

    public long? TotalBytes { get; set; }
    public long? UsedBytes { get; set; }
    public long? FreeBytes { get; set; }

    public double? UsedPercent { get; set; }

    public string? TotalText { get; set; }
    public string? UsedText { get; set; }
    public string? FreeText { get; set; }
}