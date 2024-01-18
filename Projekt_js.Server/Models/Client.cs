using System.ComponentModel.DataAnnotations;

namespace Projekt_js.Server.Models
{
	public class Client
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string Surrname { get; set; }

		public string Email { get; set; }
		public int PhoneNumber { get; set; }
		public string ZipCode { get; set; }
		public string City { get; set; }
		public string StreetAndBuildingNumber { get; set; }
		public int ApartmentNumber { get; set; }

	}
}
