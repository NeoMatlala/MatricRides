import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  // get all cars(via get all hosts)
  public getAllCars(): Observable<any> {
    return this.http.get("https://localhost:7101/api/Host/get-all-hosts")
  }

  // get car
  public getCar(hostId: number, make: string, year: number): Observable<any> {
    return this.http.get(`https://localhost:7101/api/Host/get-car/${make}/${hostId}/${year}`)
  }
}
