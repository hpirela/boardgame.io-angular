import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthService } from './auth.service';
import { MaterialModule } from '../material.module';
import { RoomComponent } from './room.component';
import { LobbyComponent } from './lobby.component';
import { BoardsModule } from '../boards/boards.module';
import { Room2Component } from './room2.component';
import { RoomResolver } from './room.resolver';
import { App2Component } from './app2.component';

@NgModule({
  declarations: [
    RoomComponent,
    Room2Component,
    AuthCallbackComponent,
    LobbyComponent,
    App2Component,
  ],
  imports: [
    CommonModule,
    MaterialModule,

    BoardsModule,
    RouterModule.forChild([
      {
        path: 'lobby',
        component: LobbyComponent,
      }, {
        path: 'callback',
        component: AuthCallbackComponent,
      }, {
        path: 'rooms/:roomId',
        component: RoomComponent,
      }, {
        path: 'app2',
        component: App2Component,
        children: [
          {
            path: 'rooms/:roomId',
            component: Room2Component,
            resolve: {
              room: RoomResolver
            }
          }
        ]
      }
    ])
  ],
  providers: [
    AuthService,
    RoomResolver,
  ]

})
export class LobbyModule {
}
