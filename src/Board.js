import React from 'react';

const style = () => {
    return {
        margin: '25px auto',
        overflow: 'hidden'
    };
};
  

export default ({ dimension, children }) => (
    <div style={style(dimension)}>
        {children}
    </div>
)