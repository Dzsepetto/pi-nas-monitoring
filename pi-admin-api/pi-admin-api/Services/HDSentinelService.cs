using pi_admin_api.Models.HDSentinel;
using pi_admin_api.Services.Interfaces;
using System.Diagnostics;
using System.Text.RegularExpressions;
namespace pi_admin_api.Services
{
    public class HDSentinelService : IHDSentinelService
    {
        private const string HdSentinelPath = "/hdsentinel/HDSentinel-armv8";
        private const string Devices = "/dev/sda,/dev/sdb";

        public async Task<HdSentinelStatusResponse> GetDiskStatusAsync()
        {
            var response = new HdSentinelStatusResponse();

            var output = await RunHdSentinelAsync();

            var lines = output
                .Split('\n', StringSplitOptions.RemoveEmptyEntries)
                .Select(line => line.Trim())
                .Where(line => line.StartsWith("/dev/"))
                .ToList();

            foreach (var line in lines)
            {
                var disk = ParseSolidLine(line);

                if (disk != null)
                {
                    response.Disks.Add(disk);
                }
            }

            return response;
        }

        private async Task<string> RunHdSentinelAsync()
        {
            var startInfo = new ProcessStartInfo
            {
                FileName = "sudo",
                Arguments = $"-n {HdSentinelPath} -onlydevs {Devices} -solidi",
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
            var error = await process.StandardError.ReadToEndAsync();

            await process.WaitForExitAsync();

            if (process.ExitCode != 0)
            {
                throw new Exception($"HD Sentinel error: {error}");
            }

            return output;
        }

        private HdSentinelDiskDto? ParseSolidLine(string line)
        {
            var match = Regex.Match(
                line,
                @"^(?<device>/dev/\S+)\s+(?<temp>-?\d+)\s+(?<health>-?\d+)\s+(?<hours>\d+)\s+(?<rest>.+)$"
            );

            if (!match.Success)
            {
                return null;
            }

            var restParts = match.Groups["rest"].Value
                .Split(' ', StringSplitOptions.RemoveEmptyEntries)
                .ToList();

            if (restParts.Count < 4)
            {
                return null;
            }

            var interfaceName = restParts[^1];
            var sizeMb = long.Parse(restParts[^2]);
            var serialNumber = restParts[^3];
            var model = string.Join(" ", restParts.Take(restParts.Count - 3));

            return new HdSentinelDiskDto
            {
                Device = match.Groups["device"].Value,
                TemperatureC = int.Parse(match.Groups["temp"].Value),
                HealthPercent = int.Parse(match.Groups["health"].Value),
                PowerOnHours = int.Parse(match.Groups["hours"].Value),
                Model = model,
                SerialNumber = serialNumber,
                SizeMb = sizeMb,
                Interface = interfaceName
            };
        }
    }
}
