using Microsoft.Extensions.Diagnostics.HealthChecks;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Projekt_js.Server.Entities
{
	public class Client
	{
		public int Id { get; set; }
		public string Role { get; set; }
		public string Name { get; set; }
		public string LastName { get; set; }
		public string Email { get; set; }
		public string PhoneNumber {  get; set; }
		public string ZipCode { get; set; }
		public string City { get; set; }
		public string Street { get; set; }
	}
}
