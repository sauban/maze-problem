import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from './Board';
import Cell from './Cell';
import util from './utils';


class Game extends Component {
    constructor() {
        super();
        this.state = {
            width: 0,
            height: 0,
            moves: 0
        };
        this.inputChanged = this.inputChanged.bind(this);
        this.toggleDisplay = this.toggleDisplay.bind(this);
        this.startGame = this.startGame.bind(this);
        this.movePlayer = this.movePlayer.bind(this);
    }

    toggleDisplay(){
        const  {
            gameStart
        } = this.state;

        this.setState({
            gameStart: !gameStart
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
        
        switch(e.keyCode) {
            case 37:
                newDirection = { y: 0, x: -1 };
                break;
            case 38:
                newDirection = { y: -1, x: 0 };
                break;
            case 39:
                newDirection = { y: 0, x: 1 };
                break;
            case 40:
                newDirection = { y: 1, x: 0 };
                break;
            default:
                return;
        }

        this.movePlayer(newDirection);
    }

    movePlayer(dirObj){
        let {
            playerCell,
            moves,
            game,
            fruitsCount
        } = this.state;

        if(fruitsCount === 0){
            window.alert(`Game over, you completed the game in ${moves} moves`);
            return;
        }

        const newMove = {
            x: playerCell.x + dirObj.y,
            y: playerCell.y + dirObj.x
        };

        const nextCell = util.getCellByCoord(game.cells, newMove);
        
        if(!nextCell){
            return;
        }

        if(nextCell.value === 'fruit'){
            fruitsCount--;         
        }
        nextCell.value = 'player';
        playerCell.value = null;
        moves++;

        if(fruitsCount === 0){
            window.alert(`Game over, you completed the game in ${moves} moves`);
        }

        const newCells = util.findAndReplaceCell(util.findAndReplaceCell(game.cells, nextCell), playerCell);

        this.setState({
            game: {
                cells: newCells
            },
            playerCell: nextCell,
            moves,
            fruitsCount
        });
    }


    startGame () {
        const {width, height, gameStart} = this.state;
        const dimension = width * height;
        const longList = Array.apply(null, {length: dimension}, [Number.call, Number]);
        const game = util.arrayToBoard(longList, width, height);
        const currentPlayerCell = util.getPlayerCell(game.cells);
        const fruitCells = util.getFruitCells(game.cells);
        this.setState({
            dimension,
            game,
            moves: 0,
            playerCell: currentPlayerCell,
            fruitsCount: fruitCells.length
        });

        if(!gameStart) { this.toggleDisplay() };
    }

    render() {
      const {
          gameStart,
          moves,
          fruitsCount,
          width,
          height
      } = this.state;

        return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Maze Problem</h1>
        </header>
        { !gameStart &&
            (
                <div>    
                    <p className="App-intro">Please input the board width and height to start the game</p>
                    <input type="number" placeholder="Board Width" onChange={this.inputChanged('width')} /> X 
                    <input onChange={this.inputChanged('height')} type="number" placeholder="Board Height" />
                    <hr />
                    <button 
                        disabled={!this.state.width || !this.state.height}
                        onClick={this.startGame}> 
                        Start Game 
                    </button>
                </div>
            ) 
        }
        { gameStart && 
            (
                <Board>
                    <table style={{margin:'0 auto'}}>
                        <tbody>
                            {this.state.game.cells.map(function(row, i) {
                            return (
                                <tr key={i}>
                                {row.map(function(cell, i) {
                                    return <Cell key={i} cell={cell} size={25} />;
                                })}
                                </tr>
                            );
                            })}
                        </tbody>
                    </table>
                    <h4>Moves: {moves} </h4> 
                    <h4>Remaining Fruits: {fruitsCount} </h4>
                    <h4>Board Dimension: {width} X {height} </h4>
                    <button onClick={this.startGame}> Restart Game </button>
                    <button onClick={this.toggleDisplay}> Reset Game Board </button>            
                </Board>
            )
        }
      </div>
    );
  }

  componentDidMount() {
    window.onkeydown = this.handleKeyDown;
  }
}

export default Game;
