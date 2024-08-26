import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  watchlist: any[] = [];

  ngOnInit(): void {
    const storedWatchlist = localStorage.getItem('watchlist');
    if (storedWatchlist) {
      try {
        this.watchlist = JSON.parse(storedWatchlist);
        console.log('Watchlist loaded:', this.watchlist);
      } catch (error) {
        console.error('Error parsing watchlist:', error);
        this.watchlist = [];
      }
    }
  }

  getRating(vote_average: number): string {
    return vote_average === 0 ? 'Unrated' : vote_average.toFixed(1);
  }

  getDuration(runtime: number): string {
    return runtime === 0 ? 'Unknown' : `${runtime} mins`;
  }


  onImageError(event: any): void {
    event.target.src = './images.png';
  }

  removeFromWatchlist(movieToRemove: any): void {
    this.watchlist = this.watchlist.filter(movie => movie.id !== movieToRemove.id);
    localStorage.setItem('watchlist', JSON.stringify(this.watchlist));
    console.log('Removed from watchlist:', movieToRemove);
  }
}
