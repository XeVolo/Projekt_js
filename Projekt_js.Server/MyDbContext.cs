using Microsoft.EntityFrameworkCore;
using Projekt_js.Server.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Projekt_js.Server.Models;

namespace Projekt_js.Server;
public class MyDbContext : DbContext
{
	public MyDbContext(DbContextOptions<MyDbContext> options)
		: base(options)
	{ 

	}
	public DbSet<Order> Orders { get; set; }
	public DbSet<Announcement> Announcements { get; set; }
	public DbSet<Category> Categories { get; set; }
	public DbSet<CategoryConnector> CategoryConnectors { get; set; }
	public DbSet<Client> Clients { get; set; }
	public DbSet<OrderConnector> OrderConnectors { get; set; }
	public DbSet<SubCategory> SubCategories { get; set; }

}

