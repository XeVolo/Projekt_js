using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Projekt_js.Server.Models
{
	public class Announcement
	{
		public int Id { get; set; }
		public string SellerId { get; set; }
		public string Title { get; set; }
		public string Description { get; set; }
		public int ProductId { get; set; }
		public string Status { get; set; }
		[DataType(DataType.Date)]
		public DateTime Date { get; set; }

		[ForeignKey("SellerId")]
		public virtual Client Seller { get; set; }
		[ForeignKey("ProductId")]
		public virtual Product Product { get; set; }
	}
}
