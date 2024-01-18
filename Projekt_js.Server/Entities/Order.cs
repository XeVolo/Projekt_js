using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projekt_js.Server.Entities
{
	public class Order
	{
		public int Id { get; set; }
		public int ClientId { get; set; }
		public virtual ICollection<Announcement> Announcements { get; set; }
		public int SummaryPrice { get; set; }
		public virtual Client Client { get; set; }
	}
}
