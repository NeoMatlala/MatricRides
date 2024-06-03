using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.ClientService
{
    public class ClientService : IClientService
    {
        private readonly ApplicationDbContext _db;
        public ClientService(ApplicationDbContext db)
        {
            _db = db;
        }

        public int GetClientIdViaEmail(string email)
        {
            if(string.IsNullOrEmpty(email))
            {
                Console.WriteLine("Email is empty");
                return 0;
            }

            var client = _db.Clients.FirstOrDefault(x => x.Email == email);

            if(client == null)
            {
                Console.WriteLine("Client doesnt exist");
                return 0;
            }

            return client.ClientId;
        }

        public Client GetClientViaId(int clientId)
        {
            if ( clientId == 0)
            {
                Console.WriteLine("ID cannot be null");
                return null;
            }

            var client = _db.Clients.Find(clientId);

            if( client == null )
            {
                Console.WriteLine("Client doesnt exist");
                return null;
            }

            return client;
        }
    }
}
