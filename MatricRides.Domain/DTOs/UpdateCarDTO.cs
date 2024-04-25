using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class UpdateCarDTO
    {
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? Year { get; set; }
        public string? Doors { get; set; }
        public string? Color { get; set; }
        public string? FuelType { get; set; }
        public string? Descripion { get; set; }
        public string? HourlyRate { get; set; }
        public string? City { get; set; }
        public string? Province { get; set; }

        public List<Image>? Images { get; set; }
    }
}
