import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MusicDataService } from '../music-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {

  results: any;
  searchQuery!: string;

  paramSub!: Subscription;

  constructor(private route:ActivatedRoute, private musicDataService: MusicDataService) { }

  ngOnInit(): void {
    this.paramSub = this.route.queryParams.subscribe(param =>{
      this.searchQuery = param.q;
      this.musicDataService.searchArtists(param.q).subscribe(
        data => {
          console.log(data)
          this.results = data.artists.items.filter(
            (x:any)=>x.images.length > 0
          )})
    })
  }

  ngOnDestroy(): void {
    if(this.paramSub){
      this.paramSub.unsubscribe();
    }
  }

}
