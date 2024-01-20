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
    public class OrderController : ControllerBase
    {
        private readonly MyDbContext _context;

        public OrderController(MyDbContext context)
        {
            _context = context;
        }

        // GET: api/Order
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _context.Orders.ToListAsync();
        }

        // GET: api/Order/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }
        // POST: api/Order
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Order>> PostOrder(OrderModel order)
        {
            var client = new Client { Name = order.Name,Role="Client", LastName = order.LastName, Email = order.Email, PhoneNumber = order.PhoneNumber, ZipCode = order.ZipCode, City = order.City, Street = order.Street };
		     _context.Clients.Add(client);
			 await _context.SaveChangesAsync();
			var order2 = new Order { ClientId = client.Id, Date = DateTime.Now, SummaryPrice = 0 };
            _context.Orders.Add(order2);
            await _context.SaveChangesAsync();
            double sumprice = 0;
            foreach(int item in order.Announcements)
            {
                var announ = await _context.Announcements.FindAsync(item);
                sumprice += announ.Price;
                var connector = new OrderConnector { AnnouncementId = announ.Id, OrderId = order2.Id };
			     _context.OrderConnectors.Add(connector);
				await _context.SaveChangesAsync();
			}
            order2.SummaryPrice = sumprice;
			_context.Entry(order2).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/Order/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _context.Orders.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Orders.Remove(order);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool OrderExists(int id)
        {
            return _context.Orders.Any(e => e.Id == id);
        }
    }
}
