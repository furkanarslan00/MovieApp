import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl: string = 'https://api.themoviedb.org/3';

  private accessToken: string = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZDA5YTMxNTlmZjY4ZmYwMTM3MTA1ODg2NTdiZmVlNiIsIm5iZiI6MTcyNDAwNDU4MS4wNjQ5OTk4LCJzdWIiOiI2NmMyMzhlNWY0ODczYTU4YzFkNTQ2NzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.tvjjXTKHHKJ_u3IeZwiIi0OiOS6xS0bOnm1rvHtApjE';

  private httpOptions = {
    headers: new HttpHeaders({
      accept: 'application/json',
      Authorization: `Bearer ${this.accessToken}`
    })
  };

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/trending/movie/week`, this.httpOptions)
      .pipe(map((res: any) => res.results));
  }

  getNowPlayingMovies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movie/now_playing?language=en-US&page=1`, this.httpOptions)
      .pipe(map((res: any) => res.results));
  }

  getUpcomingMovies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movie/upcoming?language=en-US&page=1`, this.httpOptions)
      .pipe(map((res: any) => res.results));
  }

  getTopRatedMovies(): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movie/top_rated?language=en-US&page=1`, this.httpOptions)
      .pipe(map((res: any) => res.results));
  }

  searchMovies(query: string): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/search/movie?query=${query}&language=en-US&page=1&include_adult=false`, this.httpOptions)
      .pipe(map((res: any) => res.results));
  }

  getMovieDetails(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movie/${id}?language=en-US`, this.httpOptions);
  }

  getMovie(id: number): Observable<any> {
    return this.http
      .get(`${this.apiUrl}/movie/${id}`, this.httpOptions);
  }
}
