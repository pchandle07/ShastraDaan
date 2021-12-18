import React, { useEffect } from 'react';
import { useState } from "react";
import './ProgressBar.css'

const ProgressBar = (props) => {
    
    const [style, setStyle] = useState({});
    const [progress, setProgress] = useState('0%')

    setTimeout(() => {
        const newStyle = {
          opacity: 1,
          width: progress
        };
  
        setStyle(newStyle);
      }, 200);

      useEffect(() => {
          
          let newProgress = props.percentage + "%";
          setProgress(newProgress);
      })

    return (

        <div className="progress">
            <div className="progress-done" style={style}>
                {progress}
            </div>
        </div>

    );
};

export default ProgressBar;