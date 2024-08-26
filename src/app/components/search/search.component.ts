import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../service/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchQuery: string = ''; 
  tempQuery: string = ''; 
  searchResults: any[] = [];
  searchExecuted: boolean = false;
  currentSearchPage: number = 1;
  pageSize: number = 5;
  gifPath: string = './notfound.gif';
  scrollButtonVisible: boolean = false;

  private previousSearchQuery: string = ''; 
  private previousSearchResults: any[] = []; 

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    const navigation = this.route.snapshot.paramMap.get('state');
    if (navigation) {
      const state = this.route.snapshot.paramMap.get('state') || '{}';
      this.searchResults = JSON.parse(state).results || [];
      this.searchQuery = this.route.snapshot.queryParamMap.get('query') || '';
      this.searchExecuted = true;
    } else {
      this.route.queryParams.subscribe(params => {
        const newQuery = params['query'] || '';

        if (this.previousSearchQuery === newQuery && this.previousSearchResults.length > 0) {
          this.searchQuery = this.previousSearchQuery;
          this.searchResults = this.previousSearchResults;
          this.searchExecuted = true;
        } else {
          this.searchQuery = newQuery;
          this.tempQuery = this.searchQuery;
          if (this.searchQuery) {
            this.searchMovies();
          }
        }
      });
    }
  }

  searchMovies(): void {
    this.searchQuery = this.tempQuery;
    this.searchResults = [];
    this.searchExecuted = false;
    this.scrollButtonVisible = true;

    if (this.searchQuery.trim() !== '') {
      this.movieService.searchMovies(this.searchQuery).subscribe(results => {
        this.searchResults = results;
        this.searchResults.forEach(movie => {
          this.movieService.getMovieDetails(movie.id).subscribe(details => {
            movie.runtime = details.runtime;
          });
        });
        this.searchExecuted = true;

        this.previousSearchQuery = this.searchQuery;
        this.previousSearchResults = this.searchResults;
        localStorage.setItem('searchQuery', this.searchQuery);
        localStorage.setItem('searchResults', JSON.stringify(this.searchResults));
      });
    }
  }

  onImageError(event: any): void {
    event.target.src = './images.png'; 
  }

  getGenres(genreIds: number[]): string {
    const genreMap: { [key: string]: string } = {
      28: "Action",
      12: "Adventure",
      16: "Animation",
      35: "Comedy",
      80: "Crime",
      99: "Documentary",
      18: "Drama",
      10751: "Family",
      14: "Fantasy",
      36: "History",
      27: "Horror",
      10402: "Music",
      9648: "Mystery",
      10749: "Romance",
      878: "Science Fiction",
      10770: "TV Movie",
      53: "Thriller",
      10752: "War",
      37: "Western"
    };

    const genres = genreIds.map(id => genreMap[id.toString()]);
    return genres.length > 0 ? genres.join(', ') : '';
  }

  getRating(vote_average: number): string {
    return vote_average === 0 ? 'Unrated' : vote_average.toFixed(1);
  }

  getDuration(runtime: number): string {
    return runtime === 0 ? 'Unknown' : `${runtime} mins`;
  }

  scrollTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
