import { Component } from '@angular/core';
import { HostApplicationService } from '../../../../services/host-applications/host-application.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent {

  role: any = " "
  hostEmail: any = ''
  host: any = {}
  profilePic: string = ''
  showProfileMenu: boolean = false

  constructor(private _hostService: HostApplicationService, private router: Router) {}

  ngOnInit() {
    this.hostEmail = localStorage.getItem('email')
    this.showProfileMenu = false
    
    try {
      this._hostService.getHost(this.hostEmail).subscribe((response: any) => {
        this.host = response.hostObj

        this.profilePic = 'data:image/jpeg;base64,' + this.host.profilePicture;
      })
    } catch (error) {
      console.log("Error getting service: ", error)
    }
  }

  showMenu() {
    this.showProfileMenu = !this.showProfileMenu
  }

  removeRole(): void {
    localStorage.removeItem('role')
    localStorage.removeItem('email')
    this.router.navigate(['/login'])
  }

  viewProfile(email: string) {
    this.showProfileMenu = !this.showProfileMenu
    this.router.navigate(["/profile", email],)
  }
}
