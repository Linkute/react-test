import React, { Component } from 'react';
import Search from './Search';
// import {Sort} from './Sort';
// const Sort = require('./Sort')
class Control extends Component {
    render() {
        return (
            <div className="mt-5">
                <Search onSearch={this.props.onSearch}/>
                {/* <Sort /> */}
            </div>
        )
    }
}

export default Control;