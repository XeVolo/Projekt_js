using Microsoft.EntityFrameworkCore;

namespace Projekt_js.Server.Models
{
	public class MyDbContext:DbContext
	{
		public MyDbContext(DbContextOptions<MyDbContext> options)
		: base(options)
		{
		}
		public DbSet<Announcement> Announcements { get; set; }
		public DbSet<Client> Clients { get; set; }
		public DbSet<Order> Orders { get; set; }
		public DbSet<Product> Products { get; set; }
	}
}
