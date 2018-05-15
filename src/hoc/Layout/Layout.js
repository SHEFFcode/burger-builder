import React, { Component } from 'react';
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Layout.css';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  constructor() {
    super();
    this.state = {
      showSideDrawer: false
    }
  }

  sideDrawerHandler() {
    this.setState({showSideDrawer: false});
  }

  sideDrawerToggler() {
    this.setState((prevState, props) => ({showSideDrawer: !prevState.showSideDrawer}));
  }

  render() {
    return (
      <Aux>
        <div>
          <Toolbar toggleDrawer={this.sideDrawerToggler.bind(this)}/>
          <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler.bind(this)} />
        </div>
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;