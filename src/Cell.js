import React from 'react';

const style = ({ size, cell }) => {
    const dim = size + 'px';
    let color;
    switch ( cell.value ){
        case 'fruit':
            color = 'green';
            break;
        case 'player':
            color = 'red';
            break;
        default:
            color = 'white';
    }
    return {
        width: dim,
        height: dim,
        backgroundColor: color,
        border: '1px solid black',
        transition: 'all 0.1s ease'
    };
};

export default (props) => <td key={props.cell.y} style={style(props)}/>