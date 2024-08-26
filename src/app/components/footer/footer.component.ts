import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  isVisible: boolean = false;

  openUrl(url: string) {
    window.open(url, '_blank');
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isVisible = (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
  }
}
