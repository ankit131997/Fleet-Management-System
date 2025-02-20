using System.Threading.Tasks;
using Fleeman_Dotnet.Models;

public interface ICustomerService
{
    Task<customer_master> AddCustomerAsync(customer_master customer);
}
