namespace pi_admin_api.Models.Service
{
    public class ServicesStatusResponse
    {
        public List<ServiceStatusDto> Services { get; set; } = new();
    }
}
