import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  // get cars
  public GetCars(): Observable<any> {
    return this.http.get("https://localhost:7101/api/Car/get-cars")
  }

  public GetCarsLength(): Observable<any> {
    return this.http.get<any[]>("https://localhost:7101/api/Car/get-cars").pipe(
      map((cars:any) => cars.length)
    )
  }

  public getCarInfo(hostId: number): Observable<any> {
    return this.http.get(`https://localhost:7101/api/Car/get-car-info/${hostId}`)
  }
}
