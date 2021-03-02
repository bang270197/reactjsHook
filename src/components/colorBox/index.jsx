import './ColorBox.scss';

import React, { useState } from 'react';

ColorBox.propTypes = {
    
};
function getRandomColor(){
    const arrayColor = ['deeppink','red','yelow','black','blue'];
    const randomIndex = Math.trunc(Math.random() *5);
    return arrayColor[randomIndex];
}
function ColorBox() {
    
    const [color,setColor] = useState(() =>{
        const initColor = localStorage.getItem('box_color') || 'deeppink';
        return initColor;
    });
    function handleBoxClick() {
     const newColor = getRandomColor();
     setColor(newColor);
     localStorage.setItem('box_color',newColor);
    }
    return (
        <div className="color-box" style={{backgroundColor: color}}
        onClick={handleBoxClick}
        >
            ColorBox
        </div>
    );
}

export default ColorBox;