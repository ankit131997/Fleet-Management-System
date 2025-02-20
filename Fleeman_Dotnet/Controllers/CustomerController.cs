using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

using Fleeman_Dotnet.Models;
using Fleeman_Dotnet.Services;

namespace WebApiDemo.Controllers
{
    [Route("api/[controller]")]
    [ApiController]


    public class CustomerController : ControllerBase
    {
        private readonly ICustomerService _customerService;
        

        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
           
        }

        
        

        [HttpPost("addCustomer")]


        public async Task<IActionResult> AddCustomer([FromBody] customer_master customer)
        {
            var customerMaster = await _customerService.AddCustomerAsync(customer);

            if(customerMaster == null)
            {
                return BadRequest("Customer Already Exists");
            }

            return StatusCode(201, "Customer Added Successfully");
        }
    }
}
