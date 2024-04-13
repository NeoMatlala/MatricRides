import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HostApplication } from '../../models/host-application';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HostApplicationService {

  constructor(private http:HttpClient) { }

  public submitHostApplication(host:HostApplication): Observable<HostApplication> {
    return this.http.post<HostApplication>("https://localhost:7101/api/HostApproval/submit-host-application", host)
  }
}
