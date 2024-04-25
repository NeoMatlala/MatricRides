import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UpdateHostDto } from '../../models/update-host';

@Injectable({
  providedIn: 'root'
})
export class HostApplicationService {

  constructor(private http: HttpClient) { }

  public gethostsAwaitingApproval(): Observable<any> {
    return this.http.get("https://localhost:7101/api/HostApproval/get-hosts-awaiting-approval")
  }

  public gethostAwaitingApproval(id: number): Observable<any>{
    return this.http.get(`https://localhost:7101/api/HostApproval/get-host-awaiting-approval/${id}`)
  }

  public approveHost(hostId: number): Observable<any> {
    return this.http.put(`https://localhost:7101/api/HostApproval/approve-host/${hostId}`, hostId)
  }

  // verify email account
  public checkApproval(email:string) : Observable<any> {
    return this.http.get(`https://localhost:7101/api/HostApproval/check-approval?email=${email}`)
  }

  // get host via email
  public getHost(email:string): Observable<any> {
    return this.http.get(`https://localhost:7101/api/Host/get-host/${email}`)
  }

  // upate-host
  public updateHost(hostId:number, host: any): Observable<any> {
    return this.http.put<any>(`https://localhost:7101/api/Host/upate-host-details/${hostId}`, host)
  }
}
