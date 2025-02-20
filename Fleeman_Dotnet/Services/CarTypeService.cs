using Fleeman_Dotnet.Models;
using Microsoft.EntityFrameworkCore;


using Fleeman_Dotnet.Repository;
using Fleeman_Dotnet.DTO;

namespace Fleeman_Dotnet.Services
{
    public class CarTypeService : ICarTypeService
    {
        private readonly fleet_projectContext _context;

        public CarTypeService(fleet_projectContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CarTypeDTO>> GetCarTypesByHubAsync(int hubId)
        {
           

            var carTypes = _context.car_type_masters
           .Where(ct => ct.car_masters.Any(c => c.hub_id == hubId))
           .Select(ct => new CarTypeDTO
           {
               carTypeId = ct.cartype_id,
               carTypeName = ct.cartype_name,
               dailyRate = ct.daily_rate,
               weeklyRate = ct.weekly_rate,
               monthlyRate = ct.monthly_rate,
               //ImagePath = ct.image_path
           })
           .Distinct()
           .ToList();

            return carTypes;
        }

    }
}
