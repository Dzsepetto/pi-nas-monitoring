namespace pi_admin_api.Models.HDSentinel
{
    public class HdSentinelDiskDto
    {
        public string Device { get; set; } = string.Empty;
        public int TemperatureC { get; set; }
        public int HealthPercent { get; set; }
        public int PowerOnHours { get; set; }
        public string Model { get; set; } = string.Empty;
        public string SerialNumber { get; set; } = string.Empty;
        public long SizeMb { get; set; }
        public string Interface { get; set; } = string.Empty;
        public bool IsHealthy => HealthPercent >= 90;
    }
}
