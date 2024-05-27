using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using MatricRides.Domain.Models;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations.Schema;

namespace MatricRides.Domain.DTOs
{
    public class HostDTO
    {
        // host details
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }

        [Column(TypeName = "Profile Picture")]
        public byte[]? ProfilePicture { get; set; }

        // car details
        public string Make { get; set; }
        public string Year { get; set; }
        public string Model { get; set; }
        public string Color { get; set; }
        public string Doors { get; set; }
        public string FuelType { get; set; }
        public string Description { get; set; }
        public string HourlyRate { get; set; }

        public string? FormattedAddress { get; set; }

        //[JsonIgnore]
        //public List<Image> CarImages { get; set; }
    }
}
