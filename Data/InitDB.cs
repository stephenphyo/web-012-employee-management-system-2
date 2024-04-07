using Microsoft.EntityFrameworkCore;
using EMS.Models;

namespace EMS.Data
{
    public static class InitDB
    {
        /*
            Dependency Injection (DI) is designed to work with instances of classes rather than static classes.
            This is because static classes and methods are associated with the type itself,
            and they cannot be instantiated or injected in the same way as instances of non-static classes.
        */
        public static void Initialize(IApplicationBuilder app, bool isProduction)
        {
            using (var serviceScope = app.ApplicationServices.CreateScope())
            {
                SeedData(serviceScope.ServiceProvider.GetService<AppDbContext>(), isProduction);
            }
        }

        private static void SeedData(AppDbContext ctx, bool isProduction)
        {
            if (isProduction)
            {
                Console.WriteLine("Applying Migrations...");
                try
                {
                    ctx.Database.Migrate();
                }
                catch (Exception e)
                {
                    Console.WriteLine(e.Message);
                }
            }
        }
    }
}