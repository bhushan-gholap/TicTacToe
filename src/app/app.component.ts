import { Component, OnInit } from '@angular/core';
import _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'TicTacToe';
  private togglevar = 0;
  private gridDisplay: any;
  private random = 0;
  private panelSwitch = false;
  constructor() {
    this.gridDisplay = [{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }
      , { randomCell: 5, letter: "O" }
      , { randomCell: 6, letter: "X" }
      , { randomCell: 7, letter: "O" }
      , { randomCell: 8, letter: "X" }
      , { randomCell: 9, letter: "O" }
      , { randomCell: 10, letter: "O" }
      ,{ randomCell: 1, letter: "X" }
      , { randomCell: 2, letter: "O" }
      , { randomCell: 3, letter: "X" }
      , { randomCell: 4, letter: "O" }];
  }
  ngOnInit() {
    setInterval(() => {
      this.togglevar = this.togglevar + 1;
      if (this.togglevar > 100)
        this.togglevar = 0;
    }, 3000);
    setInterval(() => {
      _.each(this.gridDisplay, (c) => {
        c.randomCell = Math.floor((Math.random() * 10) + 1);
      });
    }, 1000);
  }
}
