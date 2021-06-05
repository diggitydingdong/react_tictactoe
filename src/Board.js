import React, { Component } from "react";
import './Board.css';
import cross from "./cross.svg";
import naught from "./naught.svg";

export default class Board extends Component {
    constructor(props) {
        super(props);

        this.state = {
            grid: [],
            turn: 1,
            status: 0,
            count: 0,
        };
    }

    componentDidMount() {
        const grid = getInitialBoard();
        this.setState({grid});
    }

    click(col, row) {
        const {grid, turn, status, count} = this.state;

        if(grid[row][col].value !== 0 || status !== 0) return null;
        grid[row][col].value = turn;
        
        var s = this.calculateResult(grid);
        
        this.setState({
            grid: grid,
            turn: turn*-1,
            status: s,
            count: count+1,
        });
    };

    calculateResult() {
        const {grid, count} = this.state;

        for(var i = 0; i < 3; i++) {
            if(grid[i][0].value === grid[i][1].value && grid[i][1].value === grid[i][2].value) return grid[i][0].value; // rows
            if(grid[0][i].value === grid[1][i].value && grid[1][i].value === grid[2][i].value) return grid[0][i].value; // cols
        }

        if(grid[0][0].value === grid[1][1].value && grid[1][1].value === grid[2][2].value) return grid[1][1].value; // topleft to bottomright diag
        if(grid[0][2].value === grid[1][1].value && grid[1][1].value === grid[2][0].value) return grid[1][1].value; // topright to bottomleft
        
        // check draw
        if(count === 8) return 2;

        return 0; // unfinished
    }

    render() {
        const {grid, turn, status} = this.state;

        return (<>
        
            {status === 0 ? <h2>Turn: {turn === 1 ? "x" : "o"}</h2> : (status === 2 ? <h2>The game ended in a draw.</h2> : <h2>Player {status === 1 ? "x" : "o"} has won.</h2>)}

            <div className="Board">
                {grid.map((row, rowI) => {
                    return (
                        <div key={rowI}>
                            {row.map((cell, colI) => {
                                const {value} = cell;
                                return (
                                    <div className="cell" key={rowI*3+colI} onClick={() => this.click(colI, rowI)}>
                                        <button>{value !== 0 ? <img src={value === 1 ? cross : naught} alt={value === 1 ? "cross" : "naught"}/> : null}</button>
                                    </div>
                                );
                            })}
                        </div>
                    );
                })}
            </div>
        </>);
    }
}

const getInitialBoard = () => {
    const grid = [];
    for(let row = 0; row < 3; row++) {
        const r = [];
        for(let col = 0; col < 3; col++) {
            r.push(createCell(col, row));
        }
        grid.push(r);
    }
    return grid;
};

const createCell = (col, row) => {
    return {
        c: col,
        r: row,
        value: 0,
    };
};