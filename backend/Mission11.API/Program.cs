using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Mission11.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("BookConnection")));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactAppBlah",
        policy =>
        {
            policy.WithOrigins("http://localhost:4400")
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(("AllowReactAppBlah"));

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
