namespace pi_admin_api.Models.Service
{
    public class ServiceStatusDto
    {
        public string Name { get; set; } = string.Empty;
        public string DisplayName { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public bool IsRunning { get; set; }
    }
}
