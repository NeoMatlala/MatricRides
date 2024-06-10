using MatricRides.Domain.DTOs;
using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.StripeService
{
    public interface IStripeService
    {
        Task<StripeList<Product>> GetProductsAsync(int limit);

        Task<SessionIDResponse> CreateCheckoutSession(StripeSessionDTO stripeSessionDto);
    }
}
