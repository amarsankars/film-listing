import {Component} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Rx';

/**
 * @title Basic table
 */
@Component({
  selector: 'film-listing',
  styleUrls: ['film-listing.css'],
  templateUrl: 'film-listing.html',
})
export class FilmListing {
  displayedColumns = ['title', 'geoRestrictions', 'parentalRating', 'permaLink', 'fbCommentsUrl', 'tags'];
  dataSource = MOVIES_DATA;
  config;
  ElementData;
  configUrl: string = 'https://www.snagfilms.com/apis/films.json?limit=10';

  constructor(private http:Http) {
  }

  ngOnInit() {
    let urlData = this.getConfig();
    //this.http.get('https://www.snagfilms.com/apis/films.json?limit=10');
    // urlData.subscribe(data => this.config = data._body);
    
    urlData.subscribe(data => {
      let myMovieList = JSON.parse(data._body);

      let filmsList = myMovieList['films'];

      MOVIES_DATA = filmsList['film'];

      this.dataSource = MOVIES_DATA;
    });
  }

  getConfig() {
    // now returns an Observable of Config
    return this.http.get(this.configUrl);
  }

  private getMovieList(res:Response) {

  }

}

export interface Config {
  films: object;
}

export interface Movies {
  fbCommentsUrl: string;
  geoRestrictions: string;
  id: string;
  parentalRating: string;
  permaLink: string;
  relatedFilms: Array<string>;
  title: string;
  tags: string;
}

let MOVIES_DATA: Movies[] = [];

