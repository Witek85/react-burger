import React, { Component } from 'react';

import classes from './Modal.css'
import Backdrop from '../Backdrop/Backdrop';

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show
        // if next props show = true
    }
    componentWillUpdate() {
        console.log('modal update')
    }
    render () {
        return (
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                    <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    <div className={classes.Close} onClick={this.props.modalClosed} >X</div>
                        {this.props.children}
        
                    </div>
            </React.Fragment>
        )
    }
}

export default Modal;