using NexusApi.Context;
using NexusApi.Interfaces;
using NexusApi.Models;
using System;
using System.Threading.Tasks;

namespace NexusApi.Services
{
    public class AccountService : IAccountService
    {
        public async Task<bool> Add(NexusContext _context, Accounts request)
        {
            if (request == null)
                return false;
            try
            {
                request.date_created = DateTime.Now;
                _context.Accounts.Add(request);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> createLog(NexusContext _context, Logs request)
        {
            if (request == null)
                return false;

            try
            {
                request.date = DateTime.Now;
                _context.Logs.Add(request);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Edit(NexusContext _context, Accounts request)
        {
            if (request == null)
                return false;

            try
            {
                var founded = await _context.Accounts.FindAsync(request.account_id);
                if (founded != null)
                {
                    _context.Accounts.Update(request);

                    await _context.SaveChangesAsync();
                    return true;
                }

                return false;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<Accounts> Get(NexusContext _context, int id)
        {
            try
            {
                var acc = await _context.Accounts.FindAsync(id);

                if (acc == null)
                    throw new ArgumentException($"Account ID[{id}] not found");

                return acc;
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<bool> Remove(NexusContext _context, int id)
        {
            var acc = await _context.Accounts.FindAsync(id);

            if (acc == null)
                return false;

            try
            {
                _context.Accounts.Remove(acc);
                await _context.SaveChangesAsync();
                return true;
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
