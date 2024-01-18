using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projekt_js.Server.Entities
{
	public class SubCategory
	{
		public int Id { get; set; }
		public int CategoryId { get; set; }
		public string Name { get; set; }
		public virtual Category Category { get; set; }
		public virtual ICollection<CategoryConnector> CategoryConnectors { get; set; }
	}
}
