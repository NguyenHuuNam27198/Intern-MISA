﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MISA.Entities
{
    public class AjaxResult
    {
        public object Data { get; set; }
        public string Message { get; set; }
        public bool Successed { get; set; }

        public AjaxResult()
        {
            Successed = true;
        }
    }
}
