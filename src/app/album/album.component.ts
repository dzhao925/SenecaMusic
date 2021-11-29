import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})
export class AlbumComponent implements OnInit {

  album: any;

  paramSub!: Subscription;

  constructor(private musicDataService: MusicDataService, private matSnackBar: MatSnackBar, private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>{
      this.musicDataService.getAlbumById(params.id).subscribe(data => this.album = data)
    })
  }

  addToFavourites(trackID:string):void{
    this.musicDataService.addToFavourites(trackID).subscribe(
      success=>{
        this.matSnackBar.open("Adding to Favourites...","Done",{duration:1500});
      },
      err=>{
        this.matSnackBar.open("Unable to add song to Favourites","Done",{duration:1500});
      }
    )
      
  }

  ngOnDestroy(): void {
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
  }
}
