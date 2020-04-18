import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import _ from "lodash";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css']
})
export class PlayComponent implements OnInit {
  private id: number; // player sign
  private computerId: number; // computer sign
  private selectorId:number;
  private sign: any = { 0: '<i class="material-icons cellIconO">panorama_fish_eye</i>', 1: '<i  class="cellIconX material-icons">clear</i>' };
  private winningSign: any = { 0: '<i class="cellIconO material-icons">brightness_1</i>', 1: '<i  class="cellIconX material-icons">cancel</i>' };
  private sub: any;
  private cells = new Array();
  private gameState = new Array(); // holds all moves
  private successCombinations = new Array(); // holds resulting success combinations for all cells
  private result = ''; // holds final result
  private singleplayer: boolean;
  constructor(private route: ActivatedRoute) {
    this.cells = [
      { id: 0, innerHtml: '' },
      { id: 1, innerHtml: '' },
      { id: 2, innerHtml: '' },
      { id: 3, innerHtml: '' },
      { id: 4, innerHtml: '' },
      { id: 5, innerHtml: '' },
      { id: 6, innerHtml: '' },
      { id: 7, innerHtml: '' },
      { id: 8, innerHtml: '' }];
    this.successCombinations =
      [{ cell: 0, successCombos: [[0, 1, 2], [0, 3, 6], [0, 4, 8]] },
      { cell: 1, successCombos: [[0, 1, 2], [1, 4, 7]] },
      { cell: 2, successCombos: [[2, 1, 0], [2, 5, 8], [2, 4, 6]] },
      { cell: 3, successCombos: [[0, 3, 6], [3, 4, 5], [0, 4, 8]] },
      { cell: 4, successCombos: [[0, 4, 8], [1, 4, 7], [2, 4, 6], [3, 4, 5]] },
      { cell: 5, successCombos: [[2, 5, 8], [5, 4, 3]] },
      { cell: 6, successCombos: [[6, 3, 0], [6, 7, 8], [6, 4, 2]] },
      { cell: 7, successCombos: [[6, 7, 8], [7, 4, 1]] },
      { cell: 8, successCombos: [[8, 7, 6], [8, 5, 2], [8, 4, 0]] }];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      debugger;
      this.id = +params['id'] || 0; // (+) converts string 'id' to a number
      this.computerId = (this.id === 0) ? 1 : 0;
      this.singleplayer = (params['mode'] === 'true') ? true : false;
      this.selectorId = +params['id'] || 0; // (+) converts string 'id' to a number
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  markCell(obj: any, signId: number) {
    if (!_.find(this.gameState, (m) => { return m.id == obj.id })) {
      this.gameState.push({ id: obj.id, sign: this.sign[signId] });
      debugger;
      obj.innerHtml = this.sign[signId];
      if (this.gameState.length > 4) {
        this.checkResult(signId);
      } else {
        if (this.singleplayer)
          this.makeNextMove(signId);
        else {
          this.id = (this.id === 0) ? 1 : 0;
        }
      }
    } else
      alert('Duplicate move');
  }
  checkResult(signId: number) {
    let lastEntry = this.gameState[this.gameState.length - 1]; // get last move
    let filterByPlayer = _.filter(this.gameState, (o) => { return o.sign == lastEntry.sign; }); // get all moves of current player
    let lastEntrySuccessCombo = _.filter(this.successCombinations, (o) => { return o.cell == lastEntry.id; }); // get all success combinations for current move
    let result = _.some(lastEntrySuccessCombo[0].successCombos, (c) => { // check if any of the success combo exists
      //debugger;
      let some = _.every(c, (cb) => {
        //debugger;
        let every = _.find(filterByPlayer, (r) => {
          //debugger;
          return r.id == cb;
        });
        return every;
      });
      return some;
    });

    debugger;
    if (!result) {
      // computer plays
      debugger;
      if (this.singleplayer)
        this.makeNextMove(signId);
      else {        
    let emptyCells = _.filter(this.cells, (c) => { return c.innerHtml === '' });    
    if (emptyCells.length > 0)    
    this.id = (this.id === 0) ? 1 : 0;
  else
    this.result = 'It\'s a Tie!!';
      }
    }
    else {

      let connectingCells = _.find(lastEntrySuccessCombo[0].successCombos, (c) => { // check if any of the success combo exists
        //debugger;
        let some = _.every(c, (cb) => {
          //debugger;
          let every = _.find(filterByPlayer, (r) => {
            //debugger;
            return r.id == cb;
          });
          return every;
        });
        return (some === true);
      });
      _.each(connectingCells, (c) => {
        _.each(this.cells, (cell) => {
          if (cell.id === c) {
            cell.innerHtml = this.winningSign[(this.id === signId) ? this.id : this.computerId];
          }
        });
      });

      if (this.singleplayer) {
        this.result = (this.id === signId) ? 'You win!!' : 'Computer Win!!';
      } else {
        //this.id = (this.id === 0) ? 1 : 0;
        this.result = (this.id === this.selectorId) ? 'Player 1 Win!!' : 'Player 2 Win!!';
      }
    }
  }
  computerPlay() {
    let emptyCells = _.filter(this.cells, (c) => { return c.innerHtml === '' });
    let successCombos = new Array();
    if (emptyCells.length > 0) {
      successCombos = this.findNextPossibleWinningMove(emptyCells, this.computerId); // Play positive
      if (successCombos.length === 0) {
        successCombos = this.findNextPossibleWinningMove(emptyCells, this.id); // Play negative
      }
    }
    // find empty cell from success combo
    let moves = _.filter(emptyCells, (ec) => {
      return _.find(successCombos, (m) => {
        return _.some(m, (r) => {
          return ec.id === r;
        });
      });
    });

    let move = _.head(moves);
    if (move)
      this.markCell(move, this.computerId);
    else {
      if (emptyCells.length > 0)
        this.markCell(_.head(emptyCells), this.computerId); // when no idial move found 
      else
        this.result = 'It\'s a Tie!!';
    }


  }
  makeNextMove(signId: number) {
    if (this.id === signId)
      this.computerPlay();
  }
  computerPlayEasy() {
    // find all vacant cells
    let emptyCells = _.filter(this.cells, (c) => { return c.innerHtml === '' });
    let emptyCellCombos = _.filter(this.successCombinations, (cb) => { return _.find(emptyCells, (o) => { return cb.cell === o.id; }) });

    // 1. check last move  
    let lastMove = _.findLast(this.gameState, (m) => { return m.sign == this.sign[this.computerId]; });
    if (!lastMove && emptyCells.length > 0) {
      // mark 1st matched vacant cell if fist move
      this.markCell(emptyCells[0], this.computerId);
    }
    else {
      debugger;
      // 2. find successcombos
      let lastEntrySuccessCombo = _.filter(this.successCombinations, (o) => { return o.cell == lastMove.id; }); // get all success combinations for current move
      //check if any of the success combo moves are vacant
      let moves = _.filter(emptyCells, (ec) => {
        return _.find(lastEntrySuccessCombo[0].successCombos, (m) => {
          return _.some(m, (r) => {
            return ec.id === r;
          });
        });
      });
      debugger;
      let move = _.last(moves);
      if (move)
        this.markCell(move, this.computerId);
      else
        this.markCell(_.head(emptyCells), this.computerId); // when no idial move found 
    }
  }

  findNextPossibleWinningMove(emptyCells: any, id: number): any {
    // 1. check last move  
    let lastMove = _.findLast(this.gameState, (m) => { return m.sign == this.sign[id]; });
    if (!lastMove && emptyCells.length > 0) {
      // mark 1st matched vacant cell if fist move
      debugger;
      let mainCell = _.find(emptyCells, (ec) => {
        return ec.id === 4 && ec.innerHtml === '';
      });
      this.markCell((mainCell && (Math.floor((Math.random() * 100) + 1) % 2 === 0)) ? mainCell : emptyCells[0], this.computerId);
    } 
    else {
      debugger;
      // 2. find successcombos
      let lastEntrySuccessCombo = _.filter(this.successCombinations, (o) => { return o.cell == lastMove.id; }); // get all success combinations for current move
      //check if any of the success combo moves are vacant and get those combos
      let combos = _.filter(lastEntrySuccessCombo[0].successCombos, (m) => {
        return _.find(emptyCells, (ec) => {
          return _.some(m, (r) => {
            return ec.id === r;
          });
        });
      });
      let filterByPlayer = _.filter(this.gameState, (o) => { return o.sign == this.sign[id]; }); // get all moves of current player
      // get the best matching success combos
      let finalmoves = new Array();
      _.each(combos, (c) => {
        let count = 0;
        _.each(filterByPlayer, (pm) => {
          if (c.indexOf(pm.id) > -1)
            count++;
          if (count > 1)
            finalmoves.push(c);
        });
      });
      let successCombos = (this.id === id) ? lastEntrySuccessCombo[0].successCombos : new Array(); // only assign any vacan cell entry when user
      if (finalmoves.length > 0) {
        successCombos = finalmoves;
      }
      return successCombos;
    }
  }
}
