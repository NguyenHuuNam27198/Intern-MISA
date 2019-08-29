using MISA.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.DL
{
    public class CustomerDL
    {
        private MISAWDT01NHNamContext db = new MISAWDT01NHNamContext();

        /// <summary>
        /// Hàm thực hiện lấy tất cả danh sách khách hàng 
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns>Danh sách khách hàng </returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        public IEnumerable<Customer> GetAll()
        {
            return db.Customers.OrderBy(n=>n.customNo);

        }

        /// <summary>
        /// Hàm thực hiện lấy danh sách khách hàng theo các trang
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns>Danh sách khách hàng </returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        public IEnumerable<Customer> Get(int pageIndex,int pageSize)
        {
            return db.Customers.OrderBy(n => n.customNo).Skip((pageIndex - 1) * pageSize).Take(pageSize);
            
        }

        /// <summary>
        /// Hàm thực hiện lấy thông tin của 1 khách hàng theo ID
        /// </summary>
        /// <param name="id"></param>
        /// <returns>Thông tin khách hàng theo ID</returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        public Customer GetById(Guid id)
        {
            return db.Customers.Where(n => n.customID == id).SingleOrDefault();
        }

        /// <summary>
        /// Hàm thực hiện thêm mới 1 khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        public int Post(Customer customer)
        {
            db.Customers.Add(customer);
            db.SaveChanges();
            return 1;
        }

        /// <summary>
        /// Hàm thực hiện cập nhật thông tin của khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        public int Put(Customer customer)
        {
            //var _customer = db.Customers.Where(n => n.customID == customer.customID).SingleOrDefault();
            //_customer = customer;
            db.Entry(customer).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();

            return 1;
        }

        /// <summary>
        /// Hàm thực hiện xóa khách hàng
        /// </summary>
        /// <param name="ids"></param>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        public int Delete(Guid [] ids)
        {
            foreach(var id in ids)
            {
                var _customer = db.Customers.Where(n => n.customID == id).SingleOrDefault();
                db.Customers.Remove(_customer);
            }
            db.SaveChanges();

            return 1;
        }
    }
}
