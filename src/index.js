import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import Map from './components/Map'

class App extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <h1>Hello World !</h1>
                <p>Here is the kfs prototype to map generation</p>
                <Map width={500}/>
            </div>
        )
    }
}




ReactDOM.render(
    <App />,
    document.getElementById('root')
);