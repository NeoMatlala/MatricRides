using MatricRides.Domain.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Infrastructure.Data
{
    public class ApplicationDbContext : IdentityDbContext
    {
        public ApplicationDbContext(DbContextOptions options) : base(options)
        {

        }

        // DB Sets
        public DbSet<Message> Messages { get; set; }
        public DbSet<Host> Hosts { get; set; }
        public DbSet<Car> Cars { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}
