using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using NexusApi.Context;
using System;
using System.Linq;

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
                throw new ArgumentException($"Malformed body: {ex.Message}");
            }

            return result;
        }

        public static string getAll(NexusContext _context, string key)
        {
            switch (key)
            {
                case "users":
                    var users = _context.Users.ToList();
                    if (users != null)
                    {
                        var cypher = CryptoHelper.Encrypt(JsonConvert.SerializeObject(users), GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                        return cypher;
                    }
                    return null;
                case "accounts":
                    var acc = _context.Accounts.ToList();
                    if (acc != null)
                    {
                        var cypher = CryptoHelper.Encrypt(JsonConvert.SerializeObject(acc), GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                        return cypher;
                    }
                    return null;
                case "teams":
                    var teams = _context.CTeams.ToList();
                    if (teams != null)
                    {
                        var cypher = CryptoHelper.Encrypt(JsonConvert.SerializeObject(teams), GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                        return cypher;
                    }
                    return null;
                case "user_team_changes":
                    var teamchanges = _context.UserTeamChanges.ToList();
                    if (teamchanges != null)
                    {
                        var cypher = CryptoHelper.Encrypt(JsonConvert.SerializeObject(teamchanges), GlobalSettings.Key, GlobalSettings.Key.Substring(0, 16));
                        return cypher;
                    }
                    return null;
                default:
                    return null;
            }
        }
    }
}
