import React from 'react';

const Card2 = (props) => {
    function handleClick(elm){
        elm.target.parentNode.classList.toggle('is-flipped');
    }

    return(
        <div className="table-card" onClick={handleClick}>
                <div className="card__face card__face--front">
                    <p>
                        {props.frontText}
                    </p>       
                </div>
                <div className="card__face card__face--back">
                    <p>
                        {props.backText}
                    </p>
                </div>
        </div>
    )
}

export default Card2;