﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class HostDTO
    {
        // car details
        public string Make { get; set; }
        public string Year { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Doors { get; set; }
        public string FuelType { get; set; }
        public string Description { get; set; }
        public string HourlyRate { get; set; }

        // host details
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
    }
}