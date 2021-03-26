using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Versioning;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NexusApi.Context;
using Microsoft.Extensions.Hosting;
using NexusApi.Interfaces;
using NexusApi.Services;
using System.Threading.Tasks;

namespace NexusApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //Entity FrameWork - Context Injection
            services.AddDbContext<NexusContext>(options => options.UseSqlServer(GlobalSettings.ConnectionString));
            //Dependency Injection 
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<ITeamService, TeamService>();

            //JWT Authetication
            var key = Encoding.ASCII.GetBytes(GlobalSettings.Secret);
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    RequireExpirationTime = true,
                };
                x.Events = new JwtBearerEvents
                {
                    //OnMessageReceived = context =>
                    //{
                    //    var authToken = context.Request.Headers["Authorization"].ToString();

                    //    var token =  !string.IsNullOrEmpty(authToken) ? authToken.Substring(7) : String.Empty;
                         
                    //    if (!string.IsNullOrEmpty(token))
                    //    {
                    //        // Read the token out of the query string
                    //        context.Token = token;
                    //    }
                    //    return Task.CompletedTask;
                    //},
                    OnAuthenticationFailed = context =>
                    {
                        if (context.Exception.GetType() == typeof(SecurityTokenExpiredException))
                        {
                            context.Response.Headers.Add("Token-Expired", "true");
                        }
                        return Task.CompletedTask;
                    }
                };
            });


            services.AddControllers();
            //SWAGGER/OPENAPI
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc(GlobalSettings.Api_Version, new OpenApiInfo { Title = "NexusApi", Version = $"V{GlobalSettings.Api_Version}" });
                // To Enable authorization using Swagger (JWT)    
                //c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme()
                //{
                //    Name = "Authorization",
                //    Type = SecuritySchemeType.ApiKey,
                //    Scheme = "Bearer",
                //    BearerFormat = "JWT",
                //    In = ParameterLocation.Header,
                //    Description = "Enter 'Bearer' [space] and then your valid token in the text input below.\r\n\r\nExample: \"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9\"",
                //});
                //c.AddSecurityRequirement(new OpenApiSecurityRequirement
                //{
                //    {
                //          new OpenApiSecurityScheme
                //            {
                //                Reference = new OpenApiReference
                //                {
                //                    Type = ReferenceType.SecurityScheme,
                //                    Id = "Bearer"
                //                }
                //            },
                //            new string[] {
                //            GlobalSettings.Secret
                //            }

                //    }
                //});
            });

            //MVC Versioning
            services.AddApiVersioning(v =>
            {
                v.AssumeDefaultVersionWhenUnspecified = true;
                v.ReportApiVersions = true;
                var multiVersionReader = new HeaderApiVersionReader("api-version");
                v.ApiVersionReader = multiVersionReader;
                v.DefaultApiVersion = new ApiVersion(Convert.ToInt32(GlobalSettings.Api_Version), 0);
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

            }

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint($"/swagger/{GlobalSettings.Api_Version}/swagger.json", $"NexusApi {GlobalSettings.Api_Version}"));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

        }
    }
}
