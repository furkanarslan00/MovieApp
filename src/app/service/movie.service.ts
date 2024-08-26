import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey: string = '4d09a3159ff68ff013710588657bfee6';  
  private apiUrl: string = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) { }

  getPopularMovies(): Observable<any> {
    const url = `${this.apiUrl}/trending/movie/week?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(
      map((response: any) => response.results)
    );
  }

  getNowPlayingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/now_playing?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url).pipe(
      map((response: any) => response.results)
    );
  }

  getUpcomingMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/upcoming?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url).pipe(
      map((response: any) => response.results)
    );
  }

  getTopRatedMovies(): Observable<any> {
    const url = `${this.apiUrl}/movie/top_rated?api_key=${this.apiKey}&language=en-US&page=1`;
    return this.http.get(url).pipe(
      map((response: any) => response.results)
    );
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=en-US&page=1&include_adult=false`;
    return this.http.get(url).pipe(
      map((response: any) => response.results)
    );
  }

  getMovieDetails(id: number): Observable<any> {
    const url = `${this.apiUrl}/movie/${id}?api_key=${this.apiKey}&language=en-US`;
    return this.http.get(url);
  }
  

  getMovie(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/${id}?api_key=${this.apiKey}`);
  }

}
