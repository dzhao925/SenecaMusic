import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {

  favourites!:Array<any>;

  paramSub!: Subscription;
  
  constructor(private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.musicDataService.getFavourites().subscribe(data => this.favourites = data.tracks)
    
  }

  removeFromFavorites(id: string): void {
    this.musicDataService.removeFromFavourites(id).subscribe(data => this.favourites = data.tracks)
  }

  ngOnDestroy(): void {
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
  }
}
