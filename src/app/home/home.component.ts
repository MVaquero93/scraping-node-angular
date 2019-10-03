import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  racetickEvents = [];

  constructor(private homeService: HomeService) { }
  //
  ngOnInit() {
    this.showRacetickEvents();
  }
  //
  showRacetickEvents(): any {
    this.homeService.getRacetickEvents().subscribe(
      data => {
        this.racetickEvents = data;
        data.forEach(item => {
          console.log(item);
        })
      },
      error => {
        console.log(error);
      }
    );
  }

}
