﻿using System.Collections.Generic;

namespace MyFirstWeb.Repositories
{
    public interface ISearchRepository
    {
        Dictionary<string, string> GetAllAliases(string prefix);
        List<IndexStats> GetAllIndices(string prefix);
    }
}