using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projekt_js.Server.Entities
{
	public class CategoryConnector
	{
		public int Id { get; set; }
		public int AnnouncementId { get; set; }
		public int SubCategoryId { get; set; }
		public virtual Announcement Announcement { get; set; }
		public virtual SubCategory SubCategory { get; set; }
	}
}
