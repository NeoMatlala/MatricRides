import { Component, ElementRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Modal } from 'flowbite';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    LoginModalComponent
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  showNavbar: boolean = false
  modalElement: HTMLElement | null = null;

  constructor(private elementRef: ElementRef) {}

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
}
