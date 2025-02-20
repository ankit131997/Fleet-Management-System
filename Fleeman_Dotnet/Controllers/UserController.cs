using Fleeman_Dotnet.Dto;
using Fleeman_Dotnet.Exceptions;
using Fleeman_Dotnet.Models;
using Fleeman_Dotnet.Services;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;


namespace Fleeman_Dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {

        public IConfiguration _configuration;

        private readonly IUser repository;

        public UserController(IUser repository , IConfiguration _configuration)
        {
            this.repository = repository;
            this._configuration = _configuration;
        }

        [HttpPost("register")]
        public async Task<ActionResult<user>> register([FromBody] user user)
        {
            var createdUser = await repository.AddUser(user);
            if (createdUser == null)
            {
                throw new BadRequest("User already exists");
            }

            return CreatedAtAction(nameof(register), createdUser);

        }


        [HttpPost("login")]
        public async Task<ActionResult> login([FromBody] UserDto userdto)
        {
            var existingUser = await repository.GetUserByUsernameAndPassword(userdto.username, userdto.password);
            if (existingUser != null)
            {
                var claims = new[] {
                    new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
                    new Claim("UserName", existingUser.username),
                     };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], claims, expires: DateTime.UtcNow.AddDays(1), signingCredentials: signIn);


                return Ok(new JwtSecurityTokenHandler().WriteToken(token));


            }

            return Unauthorized("Invalid UserName and Password");
        }
    }
}
