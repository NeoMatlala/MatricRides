using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.DTOs
{
    public class SearchResponse
    {
        public bool searchSuccess { get; set; }

        public string Message { get; set; }

        public List<Car> Cars { get; set; }
    }
}
