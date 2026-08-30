using pi_admin_api.Models.Service;
using pi_admin_api.Services.Interfaces;
using System.Diagnostics;

namespace pi_admin_api.Services
{
    public class SystemService : ISystemService
    {
        private readonly List<(string Name, string DisplayName)> _services = new()
        {
            ("tailscaled", "Tailscale"),
            ("smbd", "Samba"),
            ("hd-idle", "hd-idle")
        };

        public async Task<ServicesStatusResponse> GetServicesStatusAsync()
        {
            var result = new ServicesStatusResponse();

            foreach (var service in _services)
            {
                var status = await GetServiceStatusAsync(service.Name);

                result.Services.Add(new ServiceStatusDto
                {
                    Name = service.Name,
                    DisplayName = service.DisplayName,
                    Status = status,
                    IsRunning = status == "running"
                });
            }

            return result;
        }

        private async Task<string> GetServiceStatusAsync(string serviceName)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "systemctl",
                Arguments = $"is-active {serviceName}",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process
            {
                StartInfo = startInfo
            };

            process.Start();

            var output = await process.StandardOutput.ReadToEndAsync();
            await process.WaitForExitAsync();

            var status = output.Trim();

            return status switch
            {
                "active" => "running",
                "inactive" => "not_running",
                "failed" => "failed",
                _ => "unknown"
            };
        }

        public async Task<bool> ChangeServiceStatusAsync(string serviceName, string wantedStatus)
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "sudo",
                Arguments = $"systemctl {wantedStatus} {serviceName}",
                RedirectStandardOutput = true,
                RedirectStandardError = true,
                UseShellExecute = false,
                CreateNoWindow = true
            };

            using var process = new Process
            {
                StartInfo = startInfo
            };

            process.Start();

            await process.StandardOutput.ReadToEndAsync();
            await process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();

            return process.ExitCode == 0;
        }
    }
}
