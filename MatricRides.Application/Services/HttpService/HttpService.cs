using MatricRides.Domain.DTOs;
using MatricRides.Domain.Enums;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Diagnostics.Metrics;
using System.Linq;
using System.Net.Http.Json;
using System.Text;
using System.Threading.Tasks;
using static System.Net.WebRequestMethods;

namespace MatricRides.Application.Services.HttpService
{
    public class HttpService : IHttpService
    {
        private readonly HttpClient _httpClient;
        private readonly ApplicationDbContext _db;
        private readonly string _apiKey;

        public HttpService(HttpClient httpClient, IConfiguration configuration, ApplicationDbContext db)
        {
            _httpClient = httpClient;
            _apiKey = configuration.GetSection("GoogleMapsSettings:ApiKey").Value;
            _db = db;
        }

        // get ID first

        private async Task<string> GetPlaceIdFromAddress(string address)
        {
            string url = $"https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={Uri.EscapeDataString(address)}&inputtype=textquery&fields=place_id&key={_apiKey}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();

            JObject jsonObject = JObject.Parse(responseBody);
            var placeId = jsonObject["candidates"]?[0]?["place_id"]?.ToString();

            return placeId;
        }

        // use ID to get required data ( street name, street number, etc... ) 

        private async Task<string> GetFromAddress(string placeId)
        {

            var url = $"https://maps.googleapis.com/maps/api/place/details/json?place_id={placeId}&fields=address_component,formatted_address,name,geometry&key={_apiKey}";

            HttpResponseMessage response = await _httpClient.GetAsync(url);
            response.EnsureSuccessStatusCode();

            var responseBody = await response.Content.ReadAsStringAsync();

            return responseBody;
        }

        public async Task<HostApprovalResponse> UpdateCarAddress(int addressId, string address)
        {
           

            if (addressId == 0)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Cant update car address - ID cannot be 0"
                };
            }

            string country = null;
            string streetName = null;
            string streetNumber = null;
            string city = null;
            string province = null;
            string postalCode = null;
            double latitude;
            double longitude;

            var placeId = await GetPlaceIdFromAddress(address);

            if (placeId == null)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Cant update car address - place ID is null"
                };
            }

            var placeDetails = await GetFromAddress(placeId);

            JObject placesObject = JObject.Parse(placeDetails);

            var addressComponents = placesObject["result"]?["address_components"];
            var geometryLocation = placesObject["result"]?["geometry"]?["location"];

            if (addressComponents == null)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Cant update car address - no address_component found"
                };
            }

            if (geometryLocation == null)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = "Cant update car address - No geometry object"
                };
            }

            latitude = (double)geometryLocation["lat"];
            longitude = (double)geometryLocation["lng"];

            foreach (var component in addressComponents)
            {
                var types = component["types"]?.ToObject<string[]>();

                if (types == null)
                {
                    continue;
                }

                if (Array.Exists<string>(types, type => type == "street_number"))
                {
                    streetNumber = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "route"))
                {
                    streetName = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "locality"))
                {
                    city = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "administrative_area_level_1"))
                {
                    province = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "country"))
                {
                    country = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "postal_code"))
                {
                    postalCode = component["long_name"]?.ToString();
                }
            }

            try
            {
                var currentAddress = _db.Addresses.Find(addressId);

                if ( currentAddress == null )
                {
                    return new HostApprovalResponse
                    {
                        IsSuccess = false,
                        Message = $"Error updating car address: no address for provided addressId"
                    };
                }

                currentAddress.StreetName = streetName;
                currentAddress.StreetNumber = streetNumber;
                currentAddress.City = city;
                currentAddress.Province = province;
                currentAddress.Country = country;
                currentAddress.PostalCode = postalCode;
                currentAddress.Longitude = longitude;
                currentAddress.Latitude = latitude;

                _db.Addresses.Update(currentAddress);
                await _db.SaveChangesAsync();

                return new HostApprovalResponse
                {
                    IsSuccess = true,
                    Message = "Car address successfully updated"
                };
            }
            catch (Exception ex)
            {
                return new HostApprovalResponse
                {
                    IsSuccess = false,
                    Message = $"Error updating car address: {ex.Message}"
                };
            }
        }

        public async Task<int> GetAddressDetailsAsync(string address, int hostId, AddressType addressType)
        {
            string country = null;
            string streetName = null;
            string streetNumber = null;
            string city = null;
            string province = null;
            string postalCode = null;
            double latitude;
            double longitude;

            var placeId = await GetPlaceIdFromAddress(address);

            if (placeId == null)
            {
                Console.WriteLine("Place ID is null");
                return 0;
            }

            var placeDetails = await GetFromAddress(placeId);

            JObject placesObject = JObject.Parse(placeDetails);

            var addressComponents = placesObject["result"]?["address_components"];
            var geometryLocation = placesObject["result"]?["geometry"]?["location"];

            if (addressComponents == null)
            {
                Console.WriteLine("No address components found.");
                return 0;
            }

            if(geometryLocation == null)
            {
                Console.WriteLine("No geometry object");
                return 0;
            }

            latitude = (double)geometryLocation["lat"];
            longitude = (double)geometryLocation["lng"];

            foreach (var component in addressComponents)
            {
                var types = component["types"]?.ToObject<string[]>();

                if (types == null)
                {
                    continue;
                }

                if (Array.Exists<string>(types, type => type == "street_number"))
                {
                    streetNumber = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "route"))
                {
                    streetName = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "locality"))
                {
                    city = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "administrative_area_level_1"))
                {
                    province = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "country"))
                {
                    country = component["long_name"]?.ToString();
                }
                if (Array.Exists<string>(types, type => type == "postal_code"))
                {
                    postalCode = component["long_name"]?.ToString();
                }
            }

            var carAddress = new Address
            {
                HostOrClientId = hostId,
                Addresstype = addressType,
                StreetName = streetName,
                StreetNumber = streetNumber,
                City = city,
                Province = province,
                Country = country,
                PostalCode = postalCode,
                Longitude = longitude,
                Latitude = latitude
            };

            try
            {
                _db.Addresses.Add(carAddress);
                await _db.SaveChangesAsync();

                return carAddress.AddressId;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error creating address: {ex.Message}");
                return 0;
            }
        }

    }
}
