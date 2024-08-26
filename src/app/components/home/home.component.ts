import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { MovieService } from '../../service/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularMovies: any[] = [];
  nowPlayingMovies: any[] = [];
  upcomingMovies: any[] = [];
  topRatedMovies: any[] = [];
  currentCategoryMovies: any[] = [];
  currentCategoryTitle: string = '';
  currentSlide: number = 0;
  transform: string = 'translateX(0)';

  constructor(
    private movieService: MovieService,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.getPopularMovies();
    this.loadCategory('nowPlaying'); 
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('resize', this.updateTransform.bind(this));
    }
  }

  getPopularMovies(): void {
    this.movieService.getPopularMovies().subscribe(movies => {
      this.popularMovies = movies.slice(0, 14);
      this.updateTransform(); 
    });
  }

  nextSlide(): void {
    if (this.currentSlide < this.popularMovies.length - 10) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0; 
    }
    this.updateTransform();
  }

  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.popularMovies.length - 10; 
    }
    this.updateTransform();
  }

  updateTransform(): void {
    if (isPlatformBrowser(this.platformId)) {
      const slideWidth = window.innerWidth < 855 ? 200 : 215; 
      this.transform = `translateX(-${this.currentSlide * slideWidth}px)`;
    }
  }

  scrollTop(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }

  goToDetail(movieId: number): void {
    this.router.navigate(['/movie', movieId], {
      queryParams: { from: this.router.url }
    });
  }
  
  
  
  loadCategory(category: string): void {
    switch (category) {
      case 'nowPlaying':
        this.currentCategoryTitle = 'Now Playing';
        this.movieService.getNowPlayingMovies().subscribe(movies => {
          this.currentCategoryMovies = movies.slice(0, 20);
        });
        break;
      case 'upcoming':
        this.currentCategoryTitle = 'Upcoming';
        this.movieService.getUpcomingMovies().subscribe(movies => {
          this.currentCategoryMovies = movies.slice(0, 20);
        });
        break;
      case 'topRated':
        this.currentCategoryTitle = 'Top Rated';
        this.movieService.getTopRatedMovies().subscribe(movies => {
          this.currentCategoryMovies = movies.slice(0, 20);
        });
        break;
    }
  }
}
