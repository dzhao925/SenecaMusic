import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { SpotifyTokenService } from './spotify-token.service';
import { environment } from 'src/environments/environment';

import { mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class MusicDataService {

  constructor(private spotifyToken: SpotifyTokenService, private http: HttpClient) {}  

  getNewReleases(): Observable<any> {
      return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
        return this.http.get<any>("https://api.spotify.com/v1/browse/new-releases", { headers: { "Authorization": `Bearer ${token}` } });
      }));
  }

  getArtistById(id:String):Observable<any>{
    return  this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  getAlbumsByArtistId(id:String): Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/artists/${id}/albums`, { headers: { "Authorization": `Bearer ${token}` }, params:{"include_groups":"album,single","limit":50} });
    }));
  }

  getAlbumById(id:String): Observable<any>{
    return  this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>(`https://api.spotify.com/v1/albums/${id}`, { headers: { "Authorization": `Bearer ${token}` } });
    }));
  }

  searchArtists(searchString:string): Observable<any>{
    return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
      return this.http.get<any>("https://api.spotify.com/v1/search", { headers: { "Authorization": `Bearer ${token}` }, params:{"q": searchString,"type": "artist","limit": 50} });
    }));
  }

  addToFavourites(id:string): Observable<[String]> {
    return this.http.put<any>(`${environment.userAPIBase}/favourites/${id}`,id)  
  }
  
  removeFromFavourites(id:string): Observable<any> {
    return this.http.delete<[String]>(`${environment.userAPIBase}/favourites/${id}`)
    .pipe(mergeMap(favouritesArray => {
    if(favouritesArray.indexOf(id) > -1)
      favouritesArray.splice(favouritesArray.indexOf(id),1);
    return this.getFavourites();
    }));
  }
  
  getFavourites(): Observable<any> {
    return this.http.get<[String]>(`${environment.userAPIBase}/favourites/`)
    .pipe(mergeMap(favouritesArray => {
      if(favouritesArray.length){
        return this.spotifyToken.getBearerToken().pipe(mergeMap(token=>{
          return this.http.get<any>("https://api.spotify.com/v1/tracks", { headers: { "Authorization": `Bearer ${token}` }, params:{"ids":favouritesArray.join()} });
      }));
      }else{
        return new Observable( o=>o.next({tracks: []}));
      }  
    }));
  }
}