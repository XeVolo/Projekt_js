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

		[HttpGet(Name = "Data2")]
		public IEnumerable<WeatherForecast> Get()
		{
			return Enumerable.Range(1, 5).Select(index => new WeatherForecast
			{
				Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
				TemperatureC = Random.Shared.Next(-20, 55),
				Summary = Summaries[Random.Shared.Next(Summaries.Length)]
			})
			.ToArray();
		}
		
	}
}
