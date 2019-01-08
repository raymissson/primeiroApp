//import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http } from '@angular/http';
/*
  Generated class for the MovieProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MovieProvider{
  private baseApiPath = "https://api.themoviedb.org/3";
  constructor(public http: Http) {
    console.log('Hello MovieProvider Provider');
  }

  getLetesMovies(page=1){
    return this.http.get(this.baseApiPath+`/movie/popular?page=${page}&api_key=969c2642ad3077b3e37d461bf69abca8`);
  }

}
