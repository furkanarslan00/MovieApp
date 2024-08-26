import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'movie-app';
  showHeaderSearch: boolean = true;
  showNavbar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.showHeaderSearch = !currentUrl.startsWith('/search') && !currentUrl.startsWith('/watchlist');
        this.showNavbar = !currentUrl.startsWith('/movie');
      }
    });
  }

  handleSearch(query: string) {
    console.log('Arama sorgusu:', query);
    this.router.navigate(['/search'], { queryParams: { q: query } });
  }
}
