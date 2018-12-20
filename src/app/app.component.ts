import { Component, Input } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import {} from 'googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MyGoogleMapApp';
  @ViewChild('search') public searchElement: ElementRef;
  place: any;

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });


      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // Check if the entered address correspond to an existing address
          console.log(place);
          if (place.geometry === undefined || place.geometry === null ) {
            // return;
            console.log('Sorry address not found. Please enter manually!');
          } else {
            console.log('Search value: ' + place.formatted_address);
            console.log('Address components: ' + place.address_components);
            console.log('Geometry location: ' + place.geometry.location);
            // for(let a = 0; a < place.address_components.length; a++) {
            //   console.log('Value ' + a + ': ' + place.address_components);
            // }
          }
        });
      });
    });
  }

}
