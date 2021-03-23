using NexusApi.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi
{
    public class GlobalSettings
    {
        //Api-version: Version number of the API
        public static string Api_Version => ConfigurationManager.AppSetting["Settings:Api-Version"];
        //Secret: Key for JWT Auth
        public static string Secret => ConfigurationManager.AppSetting["Settings:Secret"];
        //Key: SHA256 Auth
        public static string Key => ConfigurationManager.AppSetting["Settings:Key"];
        //Sql Server: Connection string [localhost]
        public static string ConnectionString => ConfigurationManager.AppSetting["ConnectionStrings:NexusDBConnectionString"];
    }
}
