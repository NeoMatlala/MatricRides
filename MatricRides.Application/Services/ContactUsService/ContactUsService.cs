using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using MatricRides.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.ContactUsService
{
    public class ContactUsService : IContactUsService
    {
        private readonly ApplicationDbContext _db;

        public ContactUsService(ApplicationDbContext db)
        {
            _db = db;
        }

        public ContactUsResponse SendMessage(ContactUsDTO messageModel)
        {
            try
            {
                var message = new Message
                {
                    Name = messageModel.Name,
                    PhoneNumber = messageModel.PhoneNumber,
                    Email = messageModel.Email,
                    Subject = messageModel.Subject,
                    MessageBody = messageModel.MessageBody
                };

                _db.Messages.Add(message);
                _db.SaveChanges();

                return new ContactUsResponse
                {
                    Message = "Message successfully sent, we'll get back to you shortly.",
                    IsMessageSent = true
                };
            }
            catch (Exception ex)
            {
                return new ContactUsResponse
                {
                    Message = $"Error sending message, {ex.Message}",
                    IsMessageSent = false
                };
            }
            
        }

    }
}
