import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { RouterModule } from '@angular/router';
import { PlayerRoutes } from './player.routes';
import { LeftPanelComponent } from 'src/app/components/left-panel/left-panel/left-panel.component';
import { ButtonMenuComponent } from 'src/app/components/button-menu/button-menu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { UserFooterComponent } from 'src/app/components/user-footer/user-footer.component';
import { HomeComponent } from '../home/home.component';
import { TopArtistsComponent } from 'src/app/components/top-artists/top-artists.component';
import { RightPanelComponent } from 'src/app/components/right-panel/right-panel.component';

@NgModule({
  declarations: [
    PlayerComponent,
    LeftPanelComponent,
    RightPanelComponent,
    ButtonMenuComponent,
    UserFooterComponent,
    HomeComponent,
    TopArtistsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRoutes),
    FontAwesomeModule
  ]
})
export class PlayerModule { }
