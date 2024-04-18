using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MatricRides.Domain.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public int CarId { get; set; }

        [Column(TypeName = "Image")]
        public byte[] CarImage { get; set; }
     }
}
