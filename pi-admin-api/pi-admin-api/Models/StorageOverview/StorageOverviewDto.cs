namespace pi_admin_api.Models.StorageOverview
{
    public class StorageOverviewDto
    {
        public string Uuid { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;

        public bool IsConnected { get; set; }
        public bool IsMounted { get; set; }

        public string? Device { get; set; }
        public string? MountPoint { get; set; }

        public double? UsedPercent { get; set; }
        public string? UsedText { get; set; }
        public string? FreeText { get; set; }
        public string? TotalText { get; set; }

        public int? HealthPercent { get; set; }
        public int? TemperatureC { get; set; }
        public int? PowerOnHours { get; set; }

        public string? Model { get; set; }
        public string? SerialNumber { get; set; }
        public string? Interface { get; set; }
    }
}
