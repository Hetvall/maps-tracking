import { Component, OnInit } from '@angular/core';
import { MapService } from '../../services';

@Component({
  selector: 'app-show-trip-info',
  templateUrl: './show-trip-info.component.html',
  styleUrl: './show-trip-info.component.css',
})
export class ShowTripInfoComponent implements OnInit {
  kms: number | undefined;
  duration: number | undefined;

  constructor(private mapService: MapService) {}

  ngOnInit(): void {
    this.mapService.tripInfoEmitter.subscribe((data) => {
      this.kms = data.kms;
      this.duration = data.duration;
    });
  }
}
