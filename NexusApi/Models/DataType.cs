using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NexusApi.Models
{
    public enum LogType
    {
        API = 0,
        APP = 1
    }

    public struct Actions
    {
        public const string USER_GET = "USER_GET";
        public const string USER_CREATE = "USER_CREATE";
        public const string USER_UPDATE = "USER_UPDATE";
        public const string USER_DELETE = "USER_DELETE";
        public const string ACCOUNT_GET = "ACCOUNT_GET";
        public const string ACCOUNT_CREATE = "ACCOUNT_CREATE";
        public const string ACCOUNT_UPDATE = "ACCOUNT_UPDATE";
        public const string ACCOUNT_DELETE = "ACCOUNT_DELETE";
        public const string TEAM_GET = "TEAM_GET";
        public const string TEAM_CREATE = "TEAM_CREATE";
        public const string TEAM_UPDATE = "TEAM_UPDATE";
        public const string TEAM_DELETE = "TEAM_DELETE";
        public const string USER_TEAM_CHANGE = "USER_TEAM_CHANGE";
        public const string LOGS_GET = "LOGS_GET";
    }
}
