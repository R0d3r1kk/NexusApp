using Microsoft.AspNetCore.Mvc.Filters;
using NexusApi.Helpers;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NexusApi.Filters
{
    public class ValidationRequest : Attribute, IAuthorizationFilter
    {
        public async void OnAuthorization(AuthorizationFilterContext context)
        {
            var body = "";
            var req = context.HttpContext.Request;

            using (StreamReader reader
                      = new StreamReader(req.Body, Encoding.UTF8, true, 1024, true))
            {
                var base64 = await reader.ReadToEndAsync().ConfigureAwait(false);
                //validate request parameters
                body = CryptoHelper.Decrypt(base64, GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                context.HttpContext.Items.Add("request_body", body);
            }
        }
    }
}
