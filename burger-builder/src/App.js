import React from "react";
import { Route, Switch } from "react-router-dom";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
//class App extends Component {
const app = (props) => {
  return (
    <div>
      <Layout>
        {/* <BurgerBuilder />
          <Checkout /> */}
        <Switch>
          <Route path="/Checkout" component={Checkout} />
          <Route path="/Orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
};

export default app;
