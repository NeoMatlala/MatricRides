import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {

  private apiKey = environment.googleMapsApiKey
  private scriptLoaded = false

  constructor() { }

  loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if(this.scriptLoaded) {
        resolve()
        return 
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places,geometry`
      script.async = true
      script.defer = true

      script.onload = () => {
        this.scriptLoaded = true
        resolve()
      }

      script.onerror = (error) => {
        reject(error)
      }

      document.head.appendChild(script)
    })
  }
}
