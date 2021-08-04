// import React, { Component } from "react";
// import Aux from "../../../hoc/Auxilary/Auxialry";
// import Button from "../../UI/Button/Button";

// // const orderSummary=(props)=>{
// class OrderSummary extends Component {
//   // can be functional component does not have to be a class
//   componentDidUpdate() {
//     console.log("[Orser Summary] did update");
//   }

//   render() {
//     const ingredientsSummary = Object.keys(this.props.ingredients).map(
//       (igKey) => {
//         return (
//           <li key={igKey}>
//             <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
//             {this.props.ingredients[igKey]}
//           </li>
//         );
//       }
//     );
//     return (
//       <Aux>
//         <h3>Your Order</h3>
//         <p>A delicious burger with the followinh ingredients</p>
//         <ul>{ingredientsSummary}</ul>
//         <p>
//           <strong>Total Price:{this.props.price.toFixed(2)}</strong>
//         </p>
//         <p>Continue to checkout?</p>
//         <Button btnType="Danger" clicked={this.props.purchaseCanceled}>
//           CANCEL
//         </Button>
//         <Button btnType="Success" clicked={this.props.purchaseContinued}>
//           CONTINUE
//         </Button>
//       </Aux>
//     );
//   }
// }

// export default OrderSummary;

import React from "react";
import Aux from "../../../hoc/Auxilary/Auxialry";
import Button from "../../UI/Button/Button";

const orderSummary = (props) => {
  const ingredientsSummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: "capitalize" }}>{igKey}</span>:
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious burger with the followinh ingredients</p>
      <ul>{ingredientsSummary}</ul>
      <p>
        <strong>Total Price:{props.price.toFixed(2)}</strong>
      </p>
      <p>Continue to checkout?</p>
      <Button btnType="Danger" clicked={props.purchaseCanceled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </Aux>
  );
};

export default orderSummary;
