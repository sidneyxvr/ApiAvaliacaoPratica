using ApiAvaliacaoPratica.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiAvaliacaoPratica
{
    public class Initialize
    {
        public static void DbInitialize(ApiContext context)
        {
            context.Database.EnsureCreated();

            if (context.Transportadoras.Count() > 0)
            {
                return;
            }
            context.Transportadoras.Add(new Transportadora() { Nome = "teste1", Cnpj = "11.222.333/0001-65", InscricaoEstadual = "123456789", Latitude = 100, Longitude = 200 });
            context.Transportadoras.Add(new Transportadora() { Nome = "teste2", Cnpj = "22.333.444/1000-56", InscricaoEstadual = "987654321", Latitude = 200, Longitude = 100 });
            context.SaveChanges();
        }
    }
}
