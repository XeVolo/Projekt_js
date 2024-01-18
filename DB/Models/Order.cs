using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Projekt_js.Server.Models
{
	public class Order
	{
		public int Id { get; set; }
		[DataType(DataType.Date)]
		public DateTime DateTime { get; set; }
		public double TotalPrice { get; set; }
		public string ClientId { get; set; }
		public string Status { get; set; }
		public virtual Client Client { get; set; }
		public virtual ICollection<Product> Products { get; set; }
	}
}
