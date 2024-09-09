import React, { useState } from 'react';
import './Tictactoe.css';
import circle_icon from '../Assests/circle.png';
import cross_icon from '../Assests/x.png';

export const Tictactoe = () => {
    const [board, setBoard] = useState(Array(9).fill(''));
    const [isXNext, setIsXNext] = useState(true);
    const [winner, setWinner] = useState(null);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const handleClick = (index) => {
        if (board[index] || winner) return;
        const newBoard = board.slice();
        newBoard[index] = isXNext ? 'x' : 'o';
        setBoard(newBoard);
        setIsXNext(!isXNext);
        const winner = calculateWinner(newBoard);
        if (winner) {
            setWinner(winner);
        }
    };

    const handleReset = () => {
        setBoard(Array(9).fill(''));
        setWinner(null);
        setIsXNext(true);
    };

    return (
        <div className='container'>
            <h1 className='title'>
                Tic <span>Tac</span>Toe
            </h1>
            <div className="board">
                {board.map((value, index) => (
                    <div
                        key={index}
                        className="box"
                        onClick={() => handleClick(index)}
                    >
                        {value === 'x' && <img src={cross_icon} alt="cross" />}
                        {value === 'o' && <img src={circle_icon} alt="circle" />}
                    </div>
                ))}
            </div>
            {winner ? (
                <h2 className='result'>
                    Congratulations: {winner === 'x' ? <img src={cross_icon} alt="cross" /> : <img src={circle_icon} alt="circle" />}
                </h2>
            ) : (
                <h2 className='result'>Play Again Now</h2>
            )}
            <button className='reset' onClick={handleReset}>
                Reset
            </button>
        </div>
    );
};
