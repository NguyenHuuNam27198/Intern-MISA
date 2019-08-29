using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class Customer
    {
        [Key]
        public Guid customID { get; set; }

        public string customNo { get; set; }

        public string customName { get; set; }

        public string customGroup { get; set; }

        public string customPhoneNumber { get; set; }

        public DateTime? customBirth { get; set; }

        public string companyName { get; set; }

        public string taxNo { get; set; }

        public string customEmail { get; set; }

        public string customAddress { get; set; }

        public string customNote { get; set; }

        public string customMemberNo { get; set; }

        public string customMemberRank { get; set; }

        public decimal? debtOfMoney { get; set; }

        public bool stopFollowing { get; set; }
    }
}
