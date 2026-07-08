using pi_admin_api.Models.HDSentinel;

namespace pi_admin_api.Services.Interfaces
{
    public interface IHDSentinelService
    {
        Task<HdSentinelStatusResponse> GetDiskStatusAsync();
    }
}
