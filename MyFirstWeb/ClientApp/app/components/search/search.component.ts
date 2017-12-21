import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public stats: SearchStats;

    constructor( @Inject(Http) private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        // No need to have this here. Just demonstrates how to call http from TypeScript
        //http.get('http://localhost:9200/infoserv_27/_count').subscribe(result => {
        //    this.count = result.json();
        //}, error => console.error(error));

        this.getstatistics();
    }

    public getstatistics() {
        this.http.get(this.baseUrl + 'api/Search/Stats').subscribe(result => {
            this.stats = result.json();
        }, error => console.error(error));

        var ezs = this.stats;
    }
}

// EZSTODO - Figure out how to pass dictionaries correctly.
interface DictionaryEntry {
    key: string;
    value: string;
}

interface IndexStats {
    name: string;
    count: string;
}

interface SearchStats {
    indices: IndexStats[];
    aliases: DictionaryEntry[];
}