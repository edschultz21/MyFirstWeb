import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public results: SearchData;
    public count: string;
    public stats: SearchStats;

    constructor(@Inject(Http) private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        http.get(baseUrl + 'api/Search/Results').subscribe(result => {
            this.results = result.json();
        }, error => console.error(error));
        http.get('http://localhost:9200/infoserv_27/_count').subscribe(result => {
            this.count = result.json();
        }, error => console.error(error));
    }

    public getstatistics() {
        this.http.get(this.baseUrl + 'api/Search/Stats').subscribe(result => {
            this.stats = result.json();
        }, error => console.error(error));

        var ezs = this.stats;
    }
}

interface SearchData {
    results: string;
}

// EZSTODO - Figure out how to pass dictionaries correctly.
interface DictionaryEntry {
    key: string;
    value: string;
}
interface SearchStats {
    indices: string[];
    aliases: DictionaryEntry[];
}