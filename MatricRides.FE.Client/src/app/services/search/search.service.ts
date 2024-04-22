import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  // get all cars(via get all hosts)
  public searchCars(city:string): Observable<any> {
    return this.http.get(`https://localhost:7101/api/Search/get-cars?city=${city}`)
  }
}
