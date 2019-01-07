import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: true
  }
  sitedrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }
  render() {
    return (
      <React.Fragment>
      <Toolbar />
      <SideDrawer 
        open={this.state.showSideDrawer}
        closed={this.sitedrawerClosedHandler}/>
      <main className={classes.Content}>
        {this.props.children}
      </main>
    </React.Fragment>
    )
  }
};

export default Layout;