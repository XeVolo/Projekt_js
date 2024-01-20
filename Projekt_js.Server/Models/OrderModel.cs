using Projekt_js.Server.Entities;

namespace Projekt_js.Server.Models
{
	public class OrderModel
	{
		public int Id { get; set; }
		public List<int> Announcements { get; set; }
		public string Name { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber { get; set; }
		public string ZipCode { get; set; }
		public string City { get; set; }
		public string Street { get; set; }
	}
}
