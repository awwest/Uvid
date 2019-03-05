import React from "react";

function Spinner(){
    return (
        <div className="spinner mt-5" style={{
            height:'30px',
            width: '30px',
            position: 'relative',
            left: '49%',
            border: '8px solid #fff',
            borderColor: 'rgb(0, 0, 0) transparent rgb(0, 7, 255) rgb(55, 55, 255)',
            borderRightColor: 'transparent',
            borderRadius: '50%',
            boxShadow: '0 0 25px 2px #eee',
            WebkitAnimation: 'spin 1s linear infinite',
            MozAnimation: 'spin 1s linear infinite',
            MsAnimation: 'spin 1s linear infinite',
            OAnimation: 'spin 1s linear infinite',
            animation: 'spin 1s linear infinite',
        }}></div>
    );
}

export default Spinner;