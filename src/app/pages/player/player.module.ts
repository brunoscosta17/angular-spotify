import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PlayerComponent } from './player.component';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel/left-panel.component';
import { ButtonMenuComponent } from 'src/app/components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFooterComponent } from 'src/app/components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistComponent } from 'src/app/components/top-artist/top-artist.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';
import { RecentsSearchsComponent } from 'src/app/components/recents-searchs/recents-searchs.component';
import { FormsModule } from '@angular/forms';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { ArtistItemComponent } from 'src/app/components/artist-item/artist-item.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    RightPanelComponent,
    ButtonMenuComponent,
    UserFooterComponent,
    HomeComponent,
    TopArtistComponent,
    RecentsSearchsComponent,
    TopArtistsComponent,
    ArtistItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(PlayerRoutes),
    FontAwesomeModule
  ]
})
export class PlayerModule { }
