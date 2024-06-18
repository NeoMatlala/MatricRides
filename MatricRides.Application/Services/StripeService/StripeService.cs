using MatricRides.Application.Services.BookingService;
using MatricRides.Domain.DTOs;
using Microsoft.Extensions.Configuration;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.StripeService
{
    public class StripeService : IStripeService
    {
        private readonly IConfiguration _configuration;
        private readonly string _apiKey;
        private readonly IBookingService _bookingsService;

        public StripeService(IConfiguration configuration, IBookingService bookingsService)
        {
            _apiKey = configuration.GetSection("Stripe:SecretKey").Value;
            _bookingsService = bookingsService;
        }

        public async Task<StripeList<Product>> GetProductsAsync(int limit)
        {
            StripeConfiguration.ApiKey = _apiKey;
            var options = new ProductListOptions { Limit = limit };
            var service = new ProductService();

            return await service.ListAsync(options);
        }

        public async Task<SessionIDResponse> CreateCheckoutSession(StripeSessionDTO stripeSessionDto)
        {

            StripeConfiguration.ApiKey = _apiKey;

            var amount = stripeSessionDto.Cost * 100;

            var options = new Stripe.Checkout.SessionCreateOptions
            {
                SuccessUrl = "http://localhost:4200/stripe-success",
                CancelUrl = "http://localhost:4200/stripe-cancel",
                Mode = "payment",
                LineItems = new List<Stripe.Checkout.SessionLineItemOptions>
                {
                    new Stripe.Checkout.SessionLineItemOptions
                    {
                        //Price = "prod_PU2CTdn1Ep6s4O",
                        PriceData = new Stripe.Checkout.SessionLineItemPriceDataOptions
                        {
                            Currency = "zar",
                            ProductData = new Stripe.Checkout.SessionLineItemPriceDataProductDataOptions
                            {
                                Name = $"MatricRides Payment for {stripeSessionDto.CarName}, from {_bookingsService.formatDate(stripeSessionDto.FromDate)} until {_bookingsService.formatDate(stripeSessionDto.UntilDate)}"
                            },
                            UnitAmount = (long)amount
                        },
                        Quantity = 1
                    }
                },
                CustomerEmail = stripeSessionDto.ClientEmail
            };

            var service = new Stripe.Checkout.SessionService();

            try
            {
                var session = service.Create(options);


                return new SessionIDResponse
                {
                    SessionExists = true,
                    SessionId = session.Id,
                };
            }
            catch (StripeException e)
            {
                //throw new Exception(e.StripeError.Message);

                return new SessionIDResponse
                {
                    SessionExists = false,
                    SessionId = e.StripeError.Message
                };
            }
        }
    }
}
