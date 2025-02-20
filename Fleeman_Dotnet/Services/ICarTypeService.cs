


using System.Collections.Generic;
using System.Threading.Tasks;
using Fleeman_Dotnet.DTO;
using Fleeman_Dotnet.Models;


namespace Fleeman_Dotnet.Services
{
    public interface ICarTypeService
    {
        Task<IEnumerable<CarTypeDTO>> GetCarTypesByHubAsync(int hubId);
    }
}
