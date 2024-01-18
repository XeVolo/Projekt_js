using Projekt_js.Server.Entities;

namespace Projekt_js.Server.Models
{
	public class AnnouncementModel
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public List<int> CategoryConnectors { get; set; }= new List<int>();
		public int Quantity { get; set; }
		public int Price { get; set; }
		public string Description { get; set; }
		public string Condition { get; set; }
		public string State { get; set; }
	}
}
