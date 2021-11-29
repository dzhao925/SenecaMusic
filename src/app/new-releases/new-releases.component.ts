import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-new-releases',
  templateUrl: './new-releases.component.html',
  styleUrls: ['./new-releases.component.css']
})
export class NewReleasesComponent implements OnInit {

  releases: any;

  paramSub!: Subscription;

  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.musicDataService.getNewReleases().subscribe((data:any) => this.releases = data.albums.items);
    
  }

  ngOnDestroy(): void {
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
  }

}
