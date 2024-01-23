using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projekt_js.Server.Entities
{
	public class Announcement
	{
		public int Id { get; set; }
		public string Name { get; set; }
		public string PhotoUrl { get; set; }
		public virtual ICollection<CategoryConnector> CategoryConnectors { get; set; }
		public virtual ICollection<OrderConnector> OrderConnectors { get; set; }
		public int Quantity { get; set; }
		public double Price { get; set; }
		public string Size { get; set; }
		public DateTime Date { get; set; }
		public string Description { get; set; }
		public string Condition { get; set; }
		public string State { get; set; }
	}
}
