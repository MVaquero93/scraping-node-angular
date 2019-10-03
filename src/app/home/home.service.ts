import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';

const apiUrl = 'http://localhost:3000/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})




export class HomeService {

  constructor(private http: HttpClient) {}

  getRacetickEvents(): Observable<any> {
    return this.http.get(apiUrl + 'racetick', httpOptions);
  }

  getSportLimitEvents(): Observable<any> {
    return this.http.get(apiUrl + 'sportlimit');
  }
}
