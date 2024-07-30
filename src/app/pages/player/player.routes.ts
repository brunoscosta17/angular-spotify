import { Routes } from "@angular/router";
import { PlayerComponent } from "./player.component";
import { HomeComponent } from "../home/home.component";
import { SongsListComponent } from "../songs-list/songs-list.component";

export const PlayerRoutes: Routes = [
    {
      path: '',
      component: PlayerComponent,
      children: [
        { path: 'home', component: HomeComponent },
        { path: 'list/:type/:id', component: SongsListComponent },
      ]
    }
]
