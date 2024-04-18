import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  public fsubmitHostApplication(formData: any): Observable<any> {
    const boundary = 'boundary_' + Math.random().toString().substr(2);
    
    // const headers = new HttpHeaders({
    //   'Content-Type': `multipart/form-data; boundary=${boundary}`
    // })
    //const headers = new HttpHeaders({'Content-Type':'multipart/form-data; charset=utf-8'});

    
    
    return this.http.post("https://localhost:7101/api/HostApproval/submit-host-application", formData, {
      headers: {
          "Content-Type": 'multipart/form-data; charset=utf-8'
      }
    })
  }
}
