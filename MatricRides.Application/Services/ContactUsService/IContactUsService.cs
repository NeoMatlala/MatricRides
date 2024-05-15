using MatricRides.Domain.DTOs;
using MatricRides.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Application.Services.ContactUsService
{
    public interface IContactUsService
    {
        ContactUsResponse SendMessage(ContactUsDTO messageModel);

        List<Message> GetMessages();

        Message GetMessage(int id);

        int UnreadMessages();
    }
}
