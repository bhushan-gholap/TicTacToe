import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,NavigationEnd,Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  private singlePlayer:boolean=null;
  private player1: string='';
  private player2: string='';
  private sub:any;
  constructor(private route: ActivatedRoute,private router: Router) {
  }
  private togglevar = 0;
  ngOnInit() {
  this.sub = this.router.events.subscribe((e: any) => {
    // If it is a NavigationEnd event re-initalise the component
    if (e instanceof NavigationEnd) {
      if(e.url === '/game'){
      this.player1='';
      this.player2='';
      this.singlePlayer = null;
      }
    }
  });
  setInterval(() => {
    this.togglevar = this.togglevar + 1;
    if (this.togglevar > 100)
      this.togglevar = 0;
  }, 500);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  setPlayer(id: number) {
    if (id === 0) {
      this.player1 = (this.singlePlayer)?'User':'Player 1'; this.player2 =  (this.singlePlayer)?'Computer':'Player 2';
    }
    if (id === 1) {
      this.player2 =  (this.singlePlayer)?'User':'Player 1'; this.player1 =  (this.singlePlayer)?'Computer':'Player 2';
    }
  }
}
