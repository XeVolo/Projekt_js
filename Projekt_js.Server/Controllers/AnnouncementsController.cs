using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Projekt_js.Server;
using Projekt_js.Server.Entities;
using Projekt_js.Server.Models;

namespace Projekt_js.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnnouncementsController : ControllerBase
    {
        private readonly MyDbContext _context;

        public AnnouncementsController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Announcements
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAnnouncements()
        {
            return await _context.Announcements.Include(s => s.CategoryConnectors).ToListAsync();
        }

        // GET: api/Announcements/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Announcement>> GetAnnouncement(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);

            if (announcement == null)
            {
                return NotFound();
            }

            return announcement;
        }

        // PUT: api/Announcements/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAnnouncement(int id, Announcement announcement)
        {
            if (id != announcement.Id)
            {
                return BadRequest();
            }

            _context.Entry(announcement).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AnnouncementExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

		// POST: api/Announcements
		// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
		[HttpPost]
		public async Task<ActionResult<AnnouncementModel>> PostAnnouncementModel(AnnouncementModel announcementModel)
		{
			Announcement announcement = new Announcement { Name = announcementModel.Name, Quantity = announcementModel.Quantity, Price = announcementModel.Price, Date = DateTime.Now, Description = announcementModel.Description, Condition = announcementModel.Condition, State = "Aktywne" };
			_context.Announcements.Add(announcement);
			await _context.SaveChangesAsync();
            foreach(int item in announcementModel.CategoryConnectors)
            {
                var query = _context.SubCategories.Find(item);
                CategoryConnector connector = new CategoryConnector { AnnoucementId = announcement.Id, SubCategoryId = query.Id };
				_context.CategoryConnectors.Add(connector);
				await _context.SaveChangesAsync();
			}

            return Ok();
		}

		// DELETE: api/Announcements/5
		[HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAnnouncement(int id)
        {
            var announcement = await _context.Announcements.FindAsync(id);
            if (announcement == null)
            {
                return NotFound();
            }

            _context.Announcements.Remove(announcement);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool AnnouncementExists(int id)
        {
            return _context.Announcements.Any(e => e.Id == id);
        }
    }
}
