import React, {Component} from 'react';
import ReactModal from 'react-modal';

export default class Modal extends Component {
    getParent() {
        return typeof document !== 'undefined' && (
            document.getElementById('appRoot') || document.querySelector('body')
        );
    }

    render() {
        return (
            <ReactModal appElement={this.getParent()} parentSelector={this.getParent} {...this.props}/>
        );
    }
}
