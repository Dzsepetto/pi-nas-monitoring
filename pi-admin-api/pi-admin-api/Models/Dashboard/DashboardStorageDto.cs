namespace pi_admin_api.Models.Dashboard
{
    public class DashboardStorageDto
    {
        public string Uuid { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public bool IsMounted { get; set; }
        public double? UsedPercent { get; set; }
        public int? HealthPercent { get; set; }
    }
}
