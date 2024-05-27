import { Component, ElementRef, Input, ViewChild, input } from '@angular/core';

// export interface PlaceSearchResult {
//   address: string
//   location? : google.maps.LatLng
//   name?: string 
// }

@Component({
  selector: 'app-search-car-address',
  standalone: true,
  imports: [],
  templateUrl: './search-car-address.component.html',
  styleUrl: './search-car-address.component.css'
})
export class SearchCarAddressComponent {
  @ViewChild('inputField')
  inputField!: ElementRef;

  autocomplete: google.maps.places.Autocomplete | undefined;
  @Input() placeholder = ''

  ngAfterViewInit() {
    this.autocomplete = new google.maps.places.Autocomplete(this.inputField.nativeElement)

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      console.log(place?.formatted_address)
      // console.log(place)

      // const result : PlaceSearchResult = {
      //   address: this.inputField.nativeElement.value,
      //   location: place?.geometry?.location,
      //   name: place?.name
      // }

      //console.log(result)
    })
  }
}
