import React, { Component } from 'react';
import "./Card.css"
export default class Card extends Component{
    constructor(props){
        super(props)

        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount(){

    }

    handleClick = () => elm =>{
        elm.target.parentNode.classList.toggle('is-flipped');
    }

    render(){
        return(
            <div className="table-card" onClick={this.handleClick("click")}>
                <div className="card__face card__face--front">
                    <p>
                        {this.props.frontText}
                    </p>       
                </div>
                <div className="card__face card__face--back">
                    <p>
                        {this.props.backText}
                    </p>
                </div>
            </div>
        )
    }

}