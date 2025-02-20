using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Fleeman_Dotnet.Models;
using Fleeman_Dotnet.Services;
using Fleeman_Dotnet.Repository;
namespace Fleeman_Dotnet.Controllers
{
    [Route("api/cartypes")]
    [ApiController]
    public class CarTypeController : ControllerBase
    {

        private readonly ICarTypeService _carTypeService;

        public CarTypeController(ICarTypeService carTypeService)
        {
            _carTypeService = carTypeService;
        }

        [HttpGet("by-hub/{hubId}")]
        public async Task<IActionResult> GetCarTypesByHub(int hubId)
        {
            var carTypes = await _carTypeService.GetCarTypesByHubAsync(hubId);
            if (carTypes == null || !carTypes.Any())
            {
                return NotFound("No car types found for the selected hub.");
            }
            return Ok(carTypes);
        }
    }
}
