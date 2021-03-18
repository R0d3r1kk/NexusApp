using NexusApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi
{
    public class GlobalSettings
    {
        public static string Api_Version => ConfigurationManager.AppSetting["Settings:Api-Version"];
        public static string Secret => ConfigurationManager.AppSetting["Settings:Secret"];
        public static string Key => ConfigurationManager.AppSetting["Settings:Key"];
        public static string ConnectionString => ConfigurationManager.AppSetting["ConnectionStrings:NexusDBConnectionString"];
    }
}
