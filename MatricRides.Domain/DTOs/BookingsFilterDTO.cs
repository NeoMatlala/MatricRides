using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class BookingsFilterDTO
    {
        [Required]
        public int CarId { get; set; }

        [Required]
        public string Status { get; set; }
    }
}
