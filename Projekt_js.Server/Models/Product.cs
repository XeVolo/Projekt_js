using System.ComponentModel.DataAnnotations;

namespace Projekt_js.Server.Models
{
	public class Product
	{
		public int Id { get; set; }
		[Required]
		[MaxLength(50)]
		public string Name { get; set; }
		public int CategoryId { get; set; }
		public int Quantity { get; set; }
		public double Price { get; set; }
		public bool IsDeleted { get; set; }		
	}
}
