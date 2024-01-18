using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Projekt_js.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class Data2Controller : ControllerBase
	{
		private static readonly string[] Summaries = new[]
		{
			"Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
		};

		private readonly ILogger<Data2Controller> _logger;

		public Data2Controller(ILogger<Data2Controller> logger)
		{
			_logger = logger;
		}

		
		
		
	}
}
