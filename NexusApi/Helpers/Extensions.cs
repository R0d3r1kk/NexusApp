using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System;

namespace NexusApi.Helpers
{
    public static class Extensions
    {
        public static T getRequest<T>(HttpContext context)
        {
            T result = default(T);
            try
            {
                string body = context.Items["request_body"].ToString();
                var request = JsonConvert.DeserializeObject<T>(body);
                result = (T)request;
            }
            catch (Exception ex)
            {
                result = default(T);
                throw new ArgumentException("Malformed body");
            }

            return result;
        }
    }
}
