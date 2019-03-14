using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ApiAvaliacaoPratica.Controllers
{
    public class TransportadoraController : Controller
    {
        [Route("api/[controller]")]
        [ApiController]
        public class TransportadoraController : ControllerBase
        {

            private readonly ApiContext _context;

            public TransportadoraController(ApiContext context)
            {
                _context = context;
            }


            // GET: api/<controller>
            [HttpGet]
            public IEnumerable<Transportadora> Get()
            {
                return _context.Transportadoras;
            }

            // GET api/<controller>/5
            [HttpGet("{id}")]
            public Transportadora Get(int id)
            {
                var transportadora = _context.Transportadoras.Find(id);
                if (transportadora == null)
                {
                    NotFound();
                }
                return transportadora;
            }

            // POST api/<controller>
            [HttpPost]
            public ActionResult Post([FromBody]Transportadora transportadora)
            {
                _context.Transportadoras.Add(transportadora);
                _context.SaveChanges();
                return CreatedAtAction(nameof(Get), new { id = transportadora.Id });
            }

            // PUT api/<controller>/5
            [HttpPut("{id}")]
            public ActionResult Put(int id, [FromBody]Transportadora transportadora)
            {
                if (id != transportadora.Id)
                {
                    return BadRequest();
                }

                _context.Entry(transportadora).State = EntityState.Modified;
                _context.SaveChangesAsync();

                return NoContent();
            }

            // DELETE api/<controller>/5
            [HttpDelete("{id}")]
            public ActionResult Delete(int id)
            {
                var transportadora = _context.Transportadoras.Find(id);

                if (transportadora == null)
                {
                    return NotFound();
                }

                _context.Transportadoras.Remove(transportadora);
                _context.SaveChangesAsync();

                return NoContent();
            }
        }
    }
}