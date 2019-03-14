using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiAvaliacaoPratica.Models
{
    public class Transportadora
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Cnpj { get; set; }
        public string InscricaoEstadual { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }
}
