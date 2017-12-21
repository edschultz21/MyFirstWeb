using Elasticsearch.Net;
using Nest;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MyFirstWeb.Repositories
{
    public class IndexStats
    {
        public string Name { get; set; }
        public string Count { get; set; }
    }

    public class SearchRepository : ISearchRepository
    {
        private ElasticClient _client;
        private const string CLIENT_INDEX = "infoserv_44";

        public SearchRepository()
        {
            _client = CreateClient("http://localhost:9200/");
        }

        private ElasticClient CreateClient(string node)
        {
            var nodes = new Uri[] { new Uri(node) };

            var connectionPool = new StaticConnectionPool(nodes);
            var connectionSettings = new ConnectionSettings(connectionPool);
            if (!String.IsNullOrEmpty(CLIENT_INDEX))
            {
                connectionSettings.DefaultIndex(CLIENT_INDEX);
                connectionSettings.DisableDirectStreaming();
            }

            return new ElasticClient(connectionSettings);
        }

        public List<IndexStats> GetAllIndices(string prefix)
        {
            var allIndices = _client.CatIndices(x => x.AllIndices());

            var myIndices = allIndices.Records.Where(x => x.Index.StartsWith(prefix)).Select(x => new IndexStats { Name = x.Index, Count = x.DocsCount }).ToList();

            return myIndices;
        }

        public Dictionary<string, string> GetAllAliases(string prefix)
        {
            var allAliases = _client.CatAliases();

            var myAliases = allAliases.Records.Where(x => x.Index.StartsWith(prefix)).ToDictionary(x => x.Alias, y => y.Index);

            return myAliases;
        }
    }
}
