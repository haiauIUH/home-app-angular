import  { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
      <form>
        <input type="text" placeholder="Filter by city" #filter/>
        <button type="button" class="primary" (click)="filterResults(filter.value)">Search</button>
      </form>
    </section>
    <section class="results">
      <app-housing-location *ngFor="let housingLocation of filteredHousingLocation" 
       [housingLocation]="housingLocation"></app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList : HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  filteredHousingLocation: HousingLocation[] = [];

  /**
   *
   */
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList : HousingLocation[] ) => {
      this.housingLocationList = housingLocationList;
      this.filteredHousingLocation = housingLocationList;

      console.log(this.filteredHousingLocation);
    });
  }

  filterResults(text: string) {
    if(!text) this.filteredHousingLocation = this.housingLocationList;

    this.filteredHousingLocation = this.housingLocationList.filter(
      (house) => {
        return house?.city.toLowerCase().includes(text.toLowerCase())
      }
    );

    // this.filteredHousingLocation = this.housingLocationList.filter(
    //   housingLocation => housingLocation?.city.toLowerCase().includes(text.toLowerCase().trim()));

    console.log(this.filteredHousingLocation);
  }
}
