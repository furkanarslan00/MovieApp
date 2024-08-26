import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../service/movie.service';

interface Movie {
  id: number;
  poster_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genre_ids: number[];
  overview: string; 
}

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
  movie: Movie | undefined;
  isInWatchlist: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private movieService: MovieService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const movieId = params['id'];
      this.getMovieDetail(movieId);
    });
  }

  getGenres(genreIds: number[] | undefined): string {
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

    if (!genreIds) {
      return 'Unknown';
    }

    const genres = genreIds.map(id => genreMap[id.toString()]);
    return genres.length > 0 ? genres.join(', ') : 'Unknown';
  }

  getMovieDetail(id: number): void {
    this.movieService.getMovie(id).subscribe(movie => {
      this.movie = movie;
      this.checkIfInWatchlist(movie);
      console.log(this.movie);
    }, error => {
      console.error('Error fetching movie details:', error);
    });
  }

  checkIfInWatchlist(movie: Movie): void {
    const watchlist: Movie[] = JSON.parse(localStorage.getItem('watchlist') || '[]');
    this.isInWatchlist = watchlist.some(m => m.id === movie.id);
  }

  goBack(): void {
    const fromPage = this.route.snapshot.queryParamMap.get('from');

    if (fromPage) {
      this.router.navigate([fromPage]);
    } else {
      const query = localStorage.getItem('searchQuery');
      const results = localStorage.getItem('searchResults');

      if (query) {
        this.router.navigate(['/search'], {
          queryParams: { query: query },
          state: { results: JSON.parse(results || '[]') }
        });
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  addToWatchlist(movie: Movie): void {
    const defaultMovie: Movie = {
      id: 0,
      poster_path: 'default-poster.jpg',
      title: 'Unknown Title',
      vote_average: 0,
      release_date: 'Unknown',
      runtime: 0,
      genre_ids: [],
      overview: 'No overview available' 
    };

    const movieToAdd = { ...defaultMovie, ...movie };

    let watchlist: Movie[] = JSON.parse(localStorage.getItem('watchlist') || '[]');
    if (!this.isInWatchlist) {
      watchlist.push(movieToAdd);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      this.isInWatchlist = true;
      console.log('Watchlist’e eklendi:', movieToAdd);
    } else {
      watchlist = watchlist.filter(m => m.id !== movie.id);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      this.isInWatchlist = false;
      console.log('Watchlist’ten çıkarıldı:', movieToAdd);
    }
  }

  onImageError(event: any): void {
    event.target.src = './images.png';
  }

  getRating(vote_average: number): string {
    return vote_average === 0 ? 'Unrated' : vote_average.toFixed(1);
  }

  getDuration(runtime: number): string {
    return runtime === 0 ? 'Unknown' : `${runtime} mins`;
  }
}
