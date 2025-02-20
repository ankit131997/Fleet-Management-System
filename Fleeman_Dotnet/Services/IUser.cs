using Fleeman_Dotnet.Models;
using Microsoft.AspNetCore.Mvc;

namespace Fleeman_Dotnet.Services
{
    public interface IUser
    {
        // adduser (User user)
        Task<ActionResult<user>> AddUser(user user);
        //getUserByUsername(string username)

        Task<user> GetUserByUsernameAndPassword(String username , String password);

        Task<ActionResult<user>?> GetUserByUsername(String username);
    }
}
