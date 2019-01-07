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
            console.log('Geometry location: ' + place.geometry.location);
            console.log('Vicinity: ' + place.vicinity);
          }
          const thearray: any [] = place.address_components;
          thearray.forEach( component => {
              const types: Array<String> = component.types;
              if (types.includes('street_number')) {
                console.log('street_number: ' + component.long_name);
              }
              if (types.includes('route')) {
                console.log('route: ' + component.long_name);
              }
              if (types.includes('locality')) {
                console.log + ('locality: ' + component.long_name);
              }
              if (types.includes('administrative_area_level_2')) {
                console.log('administrative_area_level_2: ' + component.long_name);
              }
              if (types.includes('administrative_area_level_1') ) {
                console.log('administrative_area_level_1: ' + component.long_name);
              }
              if (types.includes('postal_code')) {
                console.log('postal_code: ' + component.long_name);
              }
          });

        });
      });
    });
  }
}
