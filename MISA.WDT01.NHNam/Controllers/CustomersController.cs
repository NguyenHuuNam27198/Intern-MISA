using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using MISA.DL;
using MISA.Entities;

namespace MISA.WDT01.NHNam.Controllers
{
    public class CustomersController : ApiController
    {
        private CustomerDL db = new CustomerDL();

        /// <summary>
        /// Service thực hiện lấy danh sách tất cả khách hàng
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns>Danh sách khách hàng</returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        [Route("customers")]
        [HttpGet]
        public AjaxResult Get()
        {
            var _ajaxresult = new AjaxResult();
            try
            {
                _ajaxresult.Data = db.GetAll();
            }
            catch (Exception ex)
            {

                _ajaxresult.Data = ex;
                _ajaxresult.Successed = false;
                _ajaxresult.Message = "Hệ thông đang lỗi!";
            }


            return _ajaxresult;
        }

        /// <summary>
        /// Service thực hiện lấy danh sách khách hàng theo từng trang
        /// </summary>
        /// <param name="pageIndex"></param>
        /// <param name="pageSize"></param>
        /// <returns>Danh sách khách hàng</returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        [Route("customers/{pageIndex}/{pageSize}")]
        [HttpGet]
        public AjaxResult Get(int pageIndex, int pageSize)
        {
            var _ajaxresult = new AjaxResult();
            try
            {
                _ajaxresult.Data = db.Get(pageIndex, pageSize);
            }
            catch (Exception ex)
            {

                _ajaxresult.Data = ex;
                _ajaxresult.Successed = false;
                _ajaxresult.Message = "Hệ thông đang lỗi!";
            }


            return _ajaxresult;
        }

        /// <summary>
        /// Service thực hiện lấy thông tin khách hàng theo ID
        /// </summary>
        /// <returns>Thông tin khách hàng</returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        [Route("customers/{id}")]
        [HttpGet]
        public AjaxResult GetById(Guid id)
        {
            var _ajaxresult = new AjaxResult();
            try
            {
                _ajaxresult.Data = db.GetById(id);
            }
            catch (Exception ex)
            {

                _ajaxresult.Data = ex;
                _ajaxresult.Successed = false;
                _ajaxresult.Message = "";
            }

            return _ajaxresult;
        }

        /// <summary>
        /// Service thực hiện thêm mới khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        [Route("customers")]
        [HttpPost]
        public AjaxResult Post([FromBody] Customer customer)
        {
            customer.customID = Guid.NewGuid();
            var _ajaxresult = new AjaxResult();
            try
            {
                _ajaxresult.Data = db.Post(customer);
            }
            catch (Exception ex)
            {

                _ajaxresult.Data = ex;
                _ajaxresult.Successed = false;
                _ajaxresult.Message = "";
            }

            return _ajaxresult;
        }

        /// <summary>
        /// Service thực hiện cập nhật thông tin khách hàng
        /// </summary>
        /// <param name="customer"></param>
        /// <returns></returns>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        [Route("customers")]
        [HttpPut]
        public AjaxResult Put([FromBody]Customer customer)
        {
            var _ajaxresult = new AjaxResult();
            try
            {
                _ajaxresult.Data = db.Put(customer);
            }
            catch (Exception ex)
            {

                _ajaxresult.Data = ex;
                _ajaxresult.Successed = false;
                _ajaxresult.Message = "";
            }

            return _ajaxresult;
        }

        /// <summary>
        /// Service thực hiện xóa khách hàng 
        /// </summary>
        /// <param name="ids"></param>
        /// Created by: Nguyễn Hữu Nam 24-08-2019
        [Route("customers/")]
        [HttpDelete]
        public AjaxResult Delete([FromBody] Guid[] ids)
        {
            var _ajaxresult = new AjaxResult();
            try
            {
                _ajaxresult.Data = db.Delete(ids);
            }
            catch (Exception ex)
            {

                _ajaxresult.Data = ex;
                _ajaxresult.Successed = false;
                _ajaxresult.Message = "";
            }

            return _ajaxresult;
        }
    }
}