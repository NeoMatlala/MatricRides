using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MatricRides.Domain.DTOs;

namespace MatricRides.Application.Services.SearchService
{
    public interface ISearchService
    {
        SearchResponse getCarsViaCity(string city);
    }
}
