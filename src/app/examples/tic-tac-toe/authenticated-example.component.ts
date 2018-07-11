import { Component, OnInit } from '@angular/core';
import { TicTacToeBoardComponent } from '../../boards/tic-tac-toe-board.component';
import { HttpClient } from '@angular/common/http';
import { SERVER_ORIGIN } from '../../site-config';
import { TicTacToe } from '../../../../shared/games/tic-tac-toe';

@Component({
  template: `
    <div fxLayout="column" fxLayoutGap="40px" fxLayoutAlign="start center">
      <div fxLayout fxLayoutGap="32px">
        <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
          <strong>playerID 0</strong>
          <bio-client
            [game]="TicTacToe"
            [board]="Board"
            [debug]="false"
            [multiplayer]="{server: SERVER_ORIGIN}"
            [gameID]="gameID"
            playerID="0"
            [credentials]="players['0'].credentials">
          </bio-client>
        </div>
        <div fxLayout="column" fxLayoutAlign="start center" fxLayoutGap="32px">
          <strong>playerID 1</strong>
          <bio-client
            [game]="TicTacToe"
            [board]="Board"
            [debug]="false"
            [multiplayer]="{server: SERVER_ORIGIN}"
            [gameID]="gameID"
            playerID="1"
            [credentials]="players['1'].credentials">
          </bio-client>
        </div>
      </div>
      <div>
        <p>Change the credentials of a player, and you will notice that the
          server no longer accepts moves from that client.</p>
        <div fxLayout="column">
          <label>Player 0 credentials</label>
          <input [(ngModel)]="players['0'].credentials">
        </div>
        <div fxLayout="column">
          <label>Player 1 credentials</label>
          <input [(ngModel)]="players['0'].credentials">
        </div>
      </div>
    </div>
  `
})
export class AuthenticatedExampleComponent implements OnInit {
  SERVER_ORIGIN = SERVER_ORIGIN;

  TicTacToe = TicTacToe;
  Board = TicTacToeBoardComponent;
  gameID = 'gameID';
  players: { [key: string]: { credentials: string } } = {
    '0': {
      credentials: 'credentials',
    },
    '1': {
      credentials: 'credentials',
    },
  };

  constructor(private httpClient: HttpClient) {
  }

  async ngOnInit() {
    const gameName = 'tic-tac-toe';

    const newGame = await this.httpClient
      .post<{ gameID: string }>(`${SERVER_ORIGIN}/api/v1/games/${gameName}/create`, {
        numPlayers: 2
      }).toPromise();

    const gameID = newGame.gameID;

    const playerCredentials = [];

    for (const playerID of [0, 1]) {
      const player = await this.httpClient
        .post<{ playerCredentials: string }>(`${SERVER_ORIGIN}/api/v1/games/${gameName}/${gameID}/join`, {
          gameName,
          playerID,
          playerName: playerID.toString(),
        }).toPromise();

      playerCredentials.push(player.playerCredentials);
    }

    this.gameID = gameID;
    this.players = {
      '0': {
        credentials: playerCredentials[0],
      },
      '1': {
        credentials: playerCredentials[1],
      },
    };
  }
}
