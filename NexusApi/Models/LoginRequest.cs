﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public class LoginRequest
    {
        public string email { get; set; }
        public string password { get; set; }
    }
}
