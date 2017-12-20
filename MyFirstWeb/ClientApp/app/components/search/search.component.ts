import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public results: SearchData;
    public count: string;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Search/Results').subscribe(result => {
            this.results = result.json();
        }, error => console.error(error));
        http.get('http://localhost:9200/infoserv_27/_count').subscribe(result => {
            this.count = result.json();
        }, error => console.error(error));
    }
}

interface SearchData {
    results: string;
}
