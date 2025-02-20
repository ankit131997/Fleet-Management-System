using Fleeman_Dotnet.Models;
using Fleeman_Dotnet.Repository;
using Microsoft.EntityFrameworkCore;

namespace Fleeman_Dotnet.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly fleet_projectContext _context;

        public CustomerService(fleet_projectContext context)
        {
            _context = context;
        }

        public async Task<customer_master> AddCustomerAsync(customer_master customer)
        {
            // Check if the customer already exists
            var existingCustomer = await _context.customer_masters
                .FirstOrDefaultAsync(c => c.email == customer.email);
            if (existingCustomer != null)
            {
                return null; // Customer already exists
            }

            await _context.customer_masters.AddAsync(customer);
            await _context.SaveChangesAsync();

            return customer;
        }
    }
}
