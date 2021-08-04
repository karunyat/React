import React, { useState } from "react";
import Aux from "../Auxilary/Auxialry";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

//class Layout extends Component {
const layout = (props) => {
  // state = {
  //   showSideDrawer: false,
  // };
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);
  const sideDrawerClosedHandler = () => {
    //this.setState({ showSideDrawer: false });
    setSideDrawerIsVisible(false);
  };

  const sideDrawerToggleHandler = () => {
    // this.setState((prevState) => {
    //   return { showSideDrawer: !prevState.showSideDrawer };
    // });
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Aux>
      <Toolbar drawerToggleClicked={sideDrawerToggleHandler} />
      <SideDrawer closed={sideDrawerClosedHandler} open={sideDrawerIsVisible} />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};
export default layout;
