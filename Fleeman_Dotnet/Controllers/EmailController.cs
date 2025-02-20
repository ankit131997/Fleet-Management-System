using Fleeman_Dotnet.Models;
using Fleeman_Dotnet.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Fleeman_Dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {

        private readonly IEmailService _emailService;

        public EmailController(IEmailService emailService)
        {
            _emailService = emailService;
        }

        [HttpPost("sendEmail")]
        public async Task<IActionResult> SendEmail([FromBody] EmailMaster request)
        {
            String email = request.email;
            String username = request.firstName + " " + request.lastName;
            await  _emailService.sendEmail(email, username);
            return Ok(new { message = "Email sent successfully!" });
        }
    }
}
