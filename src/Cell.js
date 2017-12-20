import React from 'react';
import mario from './mario.png';
import mushroom from './mushroom.png';

const style = ({ size, cell }) => {
    const dim = size + 'px';
    let style = {
        width: dim,
        height: dim,
        backgroundSize: 'contain',
        border: '1px solid black',
        transition: 'all 0.1s ease'
    };
    if(cell.value === 'fruit'){
        style.backgroundImage = `url(${mushroom})`;
    } 
    if(cell.value === 'player') {
        style.backgroundImage = `url(${mario})`;        
    }

    return style;
};

export default (props) => <td style={style(props)}/>