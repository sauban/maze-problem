import React, { Component } from 'react';
import * as _ from 'lodash';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import Cell from './Cell';
import util from './utils';
import { UP, DOWN, LEFT, RIGHT } from './constants'

class Game extends Component {
    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0,
            moves: 0
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.displayBoard = this.displayBoard.bind(this);
        this.startGame = this.startGame.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
    }

    displayBoard(){
        this.setState({
            gameStart: true
        });
    }

    inputChanged(label){
        return (e) => {
            const val = e.target.value;
            const newData = {};
            newData[label] = +val;
            this.setState(newData);
        };
    }

    handleKeyDown = (e) => {
        let newDirection;
        
        console.log(e.keyCode);
        switch(e.keyCode) {
            case 37:
                newDirection = { y: 0, x: -1, dir: LEFT};
                break;
            case 38:
                newDirection = { y: -1, x: 0, dir: UP};
                break;
            case 39:
                newDirection = { y: 0, x: 1, dir: RIGHT};
                break;
            case 40:
                newDirection = { y: 1, x: 0, dir: DOWN };
                break;
            default:
                return;
        }

        this.movePlayer(newDirection);
    }

    movePlayer(dirObj){
        const {
            playerCell,
            moves,
            game
        } = this.state;
        const newMove = {
            x: playerCell.x + dirObj.x,
            y: playerCell.y + dirObj.y
        };

        const nextCell = util.getCellByCoord(game.cells, newMove);
        

        if(!nextCell){
            return;
        }

        nextCell.value = 'player';
        playerCell.value = null;
        const count = moves + 1;

        const newCells = util.findAndReplaceCell(util.findAndReplaceCell(game.cells, nextCell), playerCell);

        this.setState({
            game: {
                cells: newCells
            },
            playerCell: nextCell,
            moves: count
        })
    }


    startGame () {
        const {width, height} = this.state;
        const dimension = width * height;
        const longList = Array.apply(null, {length: dimension}, [Number.call, Number]);
        const game = util.arrayToBoard(longList, width, height);
        const currentPlayerCell = util.getPlayerCell(game.cells);
        this.setState({
            dimension,
            game,
            playerCell: currentPlayerCell
        });
        this.displayBoard();
    }

    render() {
      const {
          gameStart
      } = this.state;

        return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maze Problem</h1>
        </header> */}
        <p className="App-intro">
          Please input the board width and height to start the game
        </p>
        <input type="number" placeholder="Board Width" onChange={this.inputChanged('width')} /> X 
        <input onChange={this.inputChanged('height')} type="number" placeholder="Board Height" />
        <hr />
        <button disabled={!this.state.width || !this.state.height}
            onClick={this.startGame}
        > Start Game </button>
        { gameStart && 
        <Board>
            <table style={{margin:'0 auto'}}>
            <tbody>
                {this.state.game.cells.map(function(row, i) {
                return (
                    <tr key={i}>
                    {row.map(function(cell, i) {
                        return <Cell key={i} cell={cell} size={35} />;
                    })}
                    </tr>
                );
                })}
            </tbody>
            </table>
        </Board> 
        }
      </div>
    );
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }
}

export default Game;
