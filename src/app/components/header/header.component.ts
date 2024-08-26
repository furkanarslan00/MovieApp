import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  searchQuery: string = '';
  @Input() showSearch: boolean = true;
  constructor(private router: Router) {}

  openUrl(url: string) {
    window.open(url, '_blank');
  }

  onSearch() {
    if (this.searchQuery.trim() !== '') {
      this.router.navigate(['/search'], { queryParams: { query: this.searchQuery } });
    }
  }

  goToHomePage() {
    this.router.navigate(['/']);
  }
}
