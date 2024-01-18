using Microsoft.AspNetCore.Mvc;
using Projekt_js.Server.Entities;
using System.Net;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Projekt_js.Server.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AnnouncementController : ControllerBase
	{
		private readonly MyDbContext _context;

		public AnnouncementController(MyDbContext context)
		{
			_context = context;
		}
		// GET: api/<AnnouncementController>
		[HttpGet]
		public ActionResult <List<Announcement>> Get()
		{
			var query = _context.Announcements.Where(s => s.Quantity > 0).ToList();

			return Ok(query);
		}

		// GET api/<AnnouncementController>/5
		[HttpGet("{id}")]
		public Announcement Get(int id)
		{
			Announcement query = _context.Announcements.Find(id);
		
			return query;
		}

		// POST api/<AnnouncementController>
		[HttpPost]
		public void Post([FromBody] string value)
		{
		}

		// PUT api/<AnnouncementController>/5
		[HttpPut("{id}")]
		public void Put(int id, [FromBody] string value)
		{
		}

		// DELETE api/<AnnouncementController>/5
		[HttpDelete("{id}")]
		public void Delete(int id)
		{
		}
	}
}
