using System;
using Microsoft.AspNetCore.Mvc;

namespace MyFirstWeb.Controllers
{
    public class SearchData
    {
        public string Results { get; set; }
    }

    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        [HttpGet("[action]")]
        public SearchData Results()
        {
            return new SearchData { Results = "ezs" };
        }
    }
}