import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'search',
    templateUrl: './search.component.html'
})
export class SearchComponent {
    public results: SearchData;

    constructor(http: Http, @Inject('BASE_URL') baseUrl: string) {
        http.get(baseUrl + 'api/Search/Results').subscribe(result => {
            this.results = result.json();
        }, error => console.error(error));
    }
}

interface SearchData {
    results: string;
}
