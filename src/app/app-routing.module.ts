import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { SearchComponent } from './components/search/search.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component'; 


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watchlist', component: WatchlistComponent },
  { path: 'search', component: SearchComponent},
  { path: 'movie/:id', component: MovieDetailComponent }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
