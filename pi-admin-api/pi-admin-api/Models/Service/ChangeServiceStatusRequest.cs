namespace pi_admin_api.Models.Service
{
    public class ChangeServiceStatusRequest
    {
        public string ServiceName { get; set; } = string.Empty;
        public string WantedStatus { get; set; } = string.Empty;
    }
}
