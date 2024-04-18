using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.Models
{
    public class Host
    {
        public int HostId { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }

        public string Email { get; set; }

        public bool IsApproved { get; set; } = false;

        [Column(TypeName = "Image")]
        public byte[] ProfilePicture { get; set; }

        public List<Car> Cars { get; set; }
    }
}
