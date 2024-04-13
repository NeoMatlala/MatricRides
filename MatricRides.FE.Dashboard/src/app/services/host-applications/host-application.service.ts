import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
}
