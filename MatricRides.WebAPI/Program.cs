using MatricRides.Application.Services.BookingService;
using MatricRides.Application.Services.CarsService;
using MatricRides.Application.Services.ClientService;
using MatricRides.Application.Services.ContactUsService;
using MatricRides.Application.Services.HostApprovalService;
using MatricRides.Application.Services.HostService;
using MatricRides.Application.Services.HttpService;
using MatricRides.Application.Services.SearchService;
using MatricRides.Application.Services.UserService;
using MatricRides.Infrastructure.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// configure DB Context
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(
    builder.Configuration.GetConnectionString("DefaultConnection")
    ));

// configure identity
builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = true;
    options.Password.RequireLowercase = true;
    options.Password.RequiredLength = 5;
}).AddEntityFrameworkStores<ApplicationDbContext>().AddDefaultTokenProviders();


// configure authentication services (JWT)
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidAudience = builder.Configuration.GetSection("AuthSettings:Audience").Value,
        ValidIssuer = builder.Configuration.GetSection("AuthSettings:Issuer").Value,
        RequireExpirationTime = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration.GetSection("AuthSettings:Key").Value)),
        ValidateIssuerSigningKey = true
    };
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddCors(options => options.AddPolicy(name: "AllowLocalhost",
    policy =>
    {
        policy.WithOrigins("http://localhost:5000").WithOrigins("http://localhost:4200").AllowAnyMethod().AllowAnyHeader();
    }
    ));

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IHostApprovalService, HostApprovalService>();
builder.Services.AddScoped<IHostService, HostService>();
//builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped<ICarService, CarService>();
builder.Services.AddScoped(provider => new Lazy<ICarService>(provider.GetService<ICarService>));
builder.Services.AddScoped<ISearchService, SearchService>();
builder.Services.AddScoped<IContactUsService, ContactUsService>();
builder.Services.AddScoped<IBookingService, BookingService>();
builder.Services.AddScoped<IClientService, ClientService>();

//builder.Services.AddHttpClient<HostApprovalService>();
builder.Services.AddHttpClient<IHttpService, HttpService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowLocalhost");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
