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
		public virtual ICollection<SubCategory> SubCategories { get; set; }
		public int Amount { get; set; }
		public int Price { get; set; }
		public string Description { get; set; }
		public string Condition { get; set; }
	}
}
