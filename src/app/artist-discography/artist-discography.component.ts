import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-artist-discography',
  templateUrl: './artist-discography.component.html',
  styleUrls: ['./artist-discography.component.css']
})
export class ArtistDiscographyComponent implements OnInit {
  albums: any; 
  artist: any;

  paramSub!: Subscription;

  constructor(private route:ActivatedRoute, private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.paramSub = this.route.params.subscribe(params =>{
      this.musicDataService.getArtistById(params.id).subscribe((data:any) => this.artist = data);
      this.musicDataService.getAlbumsByArtistId(params.id).subscribe(
        data=>{
          this.albums = data.items.filter(
            (curValue:any,index:any,self:any)=>self.findIndex(
              (target:any)=>target.name.toUpperCase()===curValue.name.toUpperCase()) === index)
            });
    })
  }

  ngOnDestroy(): void {
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
  }

}
