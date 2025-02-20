using System.Text.Json.Serialization;

namespace Fleeman_Dotnet.DTO
{
    public class CarTypeDTO
    {
        public long carTypeId { get; set; }

        
        public string? carTypeName { get; set; }

        
        public double? dailyRate { get; set; }

        public double? monthlyRate { get; set; }

        
        public double? weeklyRate { get; set; }

    }
}
