using System;
using Microsoft.AspNetCore.Mvc;
using MyFirstWeb.Repositories;
using System.Collections.Generic;
using Newtonsoft.Json;
using System.Linq;

namespace MyFirstWeb.Controllers
{
    public class SearchData
    {
        public string Results { get; set; }
    }

    public class SearchStats
    {
        public List<string> Indices { get; set; }
        public List<DictionaryEntry> Aliases { get; set; }
    }

    public class DictionaryEntry
    {
        public string Key { get; set; }
        public string Value { get; set; }

        public static List<DictionaryEntry> Convert(Dictionary<string, string> dictionary)
        {
            return dictionary.Select(x => new DictionaryEntry { Key = x.Key, Value = x.Value }).ToList();
        }
    }

    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private ISearchRepository _searchRepository;

        public SearchController(ISearchRepository searchRepository)
        {
            _searchRepository = searchRepository;
        }

        [HttpGet("[action]")]
        public SearchData Results()
        {
            return new SearchData { Results = "ezs" };
        }

        [HttpGet("[action]")]
        public SearchStats Stats()
        {
            var searchStats = new SearchStats();
            var allIndices = _searchRepository.GetAllIndices("infoserv");
            var allAliases = _searchRepository.GetAllAliases("infoserv");

            return new SearchStats { Indices = allIndices, Aliases = DictionaryEntry.Convert( allAliases )};
        }

        [HttpGet("[action]")]
        public string Stats2()
        {
            var searchStats = new SearchStats();
            var allIndices = _searchRepository.GetAllIndices("infoserv");
            var allAliases = _searchRepository.GetAllAliases("infoserv");

            return JsonConvert.SerializeObject(allAliases);
        }
    }
}