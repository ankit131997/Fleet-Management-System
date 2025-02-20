using Fleeman_Dotnet.Models;
using Fleeman_Dotnet.Repository;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Fleeman_Dotnet.Services
{
    public class UserServiceImpl : IUser
    {
        private readonly fleet_projectContext _context;

        public UserServiceImpl(fleet_projectContext context)
        {
            _context = context;
        }


        public async Task<ActionResult<user>> AddUser(user user)
        {
            if (await _context.users.AnyAsync(u => u.username == user.username))
            {
                return null;   // username already exists
            }

            user.password = BCrypt.Net.BCrypt.HashPassword(user.password);
            _context.users.Add(user);
            await _context.SaveChangesAsync();
            return user;
        }

        public async Task<user> GetUserByUsernameAndPassword(string username, string password)
        {
            var user = await _context.users.SingleOrDefaultAsync(u => u.username == username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                return null;
            }
            return user;
        }


        public async Task<ActionResult<user>?> GetUserByUsername(string username)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.username == username);
            if(user == null)
            {
                return null;
            }
            return user;
        }

        
    }
}
