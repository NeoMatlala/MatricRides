import { Component, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Modal } from 'flowbite';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LoginModalComponent,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showNavbar: boolean = false
  modalElement: HTMLElement | null = null;

  isUserLoggedIn: boolean = false
  showLoginMenu: boolean = true
  menuToggle: boolean = false

  constructor(private elementRef: ElementRef, private userService: UserService) {}

  ngOnInit() {
    const loggedInState = localStorage.getItem('isLoggedIn')

    this.userService.isLoggedIn$.subscribe(value => {
      this.isUserLoggedIn = value
      
      if(this.isUserLoggedIn) {
        this.showLoginMenu = false
      }
      
    })

    if( loggedInState === 'true' ) {
      this.showLoginMenu = false;
    }

    //console.log(`is logged in ELA ere : ${this.isUserLoggedIn}`)
  }

  ngAfterViewInit(): void {
    this.modalElement = this.elementRef.nativeElement.querySelector('#default-modal')
  }

  showMobileMenu(): void {
    this.showNavbar = !this.showNavbar
  }

  closeMobileMenu(): void {
    this.showNavbar = false
  }

  showLoginModal() {
    const modal = new Modal(this.modalElement)
    modal.show()
  }

  logout() {
    this.userService.logout()
    this.showLoginMenu = true
  }

  showDropdownMenu(){
    this.menuToggle = !this.menuToggle
  }
}
