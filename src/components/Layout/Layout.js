import React, { Component } from 'react';

import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  sitedrawerClosedHandler = () => {
    this.setState({showSideDrawer: false})
  }
  sitedrawerToggleHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    })
  }
  
  render() {
    return (
      <React.Fragment>
      <Toolbar drawerToggleClicked={this.sitedrawerToggleHandler} />
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