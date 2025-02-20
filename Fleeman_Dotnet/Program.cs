

using Fleeman_Dotnet.Repository;
using Fleeman_Dotnet.Service;
using Fleeman_Dotnet.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Text;

namespace Fleeman_Dotnet
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);
            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
            builder.Services.AddDbContext<fleet_projectContext>(options =>
                options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString)));
           


            //Dependency Injection
            builder.Services.AddScoped<IUser , UserServiceImpl>();
            builder.Services.AddScoped<IStateService, StateService>();
            builder.Services.AddScoped<ICityService, CityService>();
            builder.Services.AddScoped<ICarTypeService, CarTypeService>();
            builder.Services.AddScoped<IHubService, HubService>();
            builder.Services.AddScoped<IAirportService, AirportService>();
            builder.Services.AddScoped<IBookingService, BookingServices>();
            builder.Services.AddScoped<BookingInterface, BookingInterfaceImpl>();
            builder.Services.AddScoped<IEmailService, EmailService>();
            builder.Services.AddScoped<ICustomerService, CustomerService>();


            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAll",
                    policy =>
                    {
                        policy.AllowAnyOrigin() // Allow any origin to make requests
                              .AllowAnyMethod()  // Allow any HTTP method (GET, POST, etc.)
                              .AllowAnyHeader(); // Allow any headers
                    });
            });

            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
               .AddJwtBearer(option =>
               {
                   option.RequireHttpsMetadata = false;
                   option.SaveToken = true;
                   option.TokenValidationParameters = new TokenValidationParameters()
                   {
                       ValidateIssuer = true,
                       ValidateAudience = true,
                       ValidateLifetime = true,
                       ValidAudience = builder.Configuration["Jwt:Audience"],
                       ValidIssuer = builder.Configuration["Jwt:Issuer"],
                       IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
                   };
               }
         );
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "Test01", Version = "v1" });
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme."

                });
                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {        new OpenApiSecurityScheme
                          {
                              Reference = new OpenApiReference
                              {
                                  Type = ReferenceType.SecurityScheme,
                                  Id = "Bearer"
                              }
                          },
                         new string[] {}
                    }
                });
            });


            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseCors("AllowAll"); // Apply CORS policy
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
