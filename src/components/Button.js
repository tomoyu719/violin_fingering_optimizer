import React, { Component } from 'react';
import 'react-piano/dist/styles.css';
import PropTypes from 'prop-types'
import './App.css'

export default class Button extends Component {

    static propTypes = {
        onClick: PropTypes.func.isRequired,
        label: PropTypes.string.isRequired,
    };

    render() {
        return (
            <div className='Button'>
                <button onClick={this.props.onClick} >{this.props.label}</button>
            </div>
        );
    }
}


{/* <input type="radio" id="violin" checked="checked" />
<label htmlFor="violin">violin</label>
<input type="radio" id="viola" />
<label htmlFor="viola">viola</label>
<input type="radio" id="cello" />
<label htmlFor="cello">cello</label> */}