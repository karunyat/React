// import React, { Component } from "react";

// import Aux from "../../hoc/Auxilary/Auxialry";
// import Burger from "../../components/Burger/Burger";
// import BuildControls from "../../components/Burger/BuildControls/BuildControls";
// import Modal from "../../components/UI/Modal/Modal";

// import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
// import Spinner from "../../components/UI/Spinner/Spinner";
// import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
// import axios from "../../axios-orders";

// const INGREDIENT_PRICES = {
//   salad: 0.5,
//   cheese: 0.4,
//   meat: 1.3,
//   bacon: 0.7,
// };

// class BurgerBuilder extends Component {
//   //   constructor (rops){
//   // super (props);
//   // this.state={...}
//   //   }
//   state = {
//     ingredients: null,
//     totalPrice: 4,
//     purchasable: false,
//     purchasing: false,
//     loading: false,
//     error: false,
//   };
//   componentDidMount() {
//     axios
//       .get(
//         "https://react-burger-72a67-default-rtdb.firebaseio.com/ingredients.json"
//       )
//       .then((response) => {
//         this.setState({ ingredients: response.data });
//       })
//       .catch((error) => {
//         this.setState({ error: true });
//       }, []);
//   }
//   updatePurchaseState(ingredients) {
//     const sum = Object.keys(ingredients)
//       .map((igKey) => {
//         return ingredients[igKey];
//       })
//       .reduce((sum, el) => {
//         return sum + el;
//       }, 0);
//     this.setState({ purchasable: sum > 0 });
//   }
//   addIngredientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     const updatedCount = oldCount + 1;
//     const updatedIngredients = {
//       ...this.state.ingredients,
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceAddition = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice + priceAddition;
//     this.setState({
//       totalPrice: newPrice,
//       ingredients: updatedIngredients,
//     });
//     this.updatePurchaseState(updatedIngredients);
//   };

//   removeIngredientHandler = (type) => {
//     const oldCount = this.state.ingredients[type];
//     if (oldCount <= 0) {
//       return;
//     }
//     const updatedCount = oldCount - 1;
//     const updatedIngredients = {
//       ...this.state.ingredients,
//     };
//     updatedIngredients[type] = updatedCount;
//     const priceDeduction = INGREDIENT_PRICES[type];
//     const oldPrice = this.state.totalPrice;
//     const newPrice = oldPrice - priceDeduction;
//     this.setState({
//       totalPrice: newPrice,
//       ingredients: updatedIngredients,
//     });
//     this.updatePurchaseState(updatedIngredients);
//   };

//   purchaseHandler = () => {
//     this.setState({ purchasing: true });
//   };

//   purchaseCancleHandler = () => {
//     this.setState({ purchasing: false });
//   };

//   purchaseContinueHandler = () => {
//     //alert('you continue!!');

//     const queryParams = [];
//     for (let i in this.state.ingredients) {
//       queryParams.push(
//         encodeURIComponent(i) +
//           "=" +
//           encodeURIComponent(this.state.ingredients[i])
//       );
//     }
//     queryParams.push("price=" + this.state.totalPrice);
//     const queryString = queryParams.join("&");
//     this.props.history.push({
//       pathname: "/checkout",
//       search: "?" + queryString,
//     });
//   };
//   render() {
//     const disableInfo = {
//       ...this.state.ingredients,
//     };
//     for (let key in disableInfo) {
//       disableInfo[key] = disableInfo[key] <= 0;
//     }
//     let orderSummary = null;
//     let burger = this.state.error ? (
//       <p>ingredients can't be loaded</p>
//     ) : (
//       <Spinner />
//     );

//     if (this.state.ingredients) {
//       burger = (
//         <Aux>
//           <Burger ingredients={this.state.ingredients} />
//           <BuildControls
//             ingredientAdded={this.addIngredientHandler}
//             ingredientDeducted={this.removeIngredientHandler}
//             disabled={disableInfo}
//             purchasable={this.state.purchasable}
//             ordered={this.purchaseHandler}
//             price={this.state.totalPrice}
//           />
//         </Aux>
//       );
//       orderSummary = (
//         <OrderSummary
//           ingredients={this.state.ingredients}
//           purchaseCanceled={this.purchaseCancleHandler}
//           purchaseContinued={this.purchaseContinueHandler}
//           price={this.state.totalPrice}
//         />
//       );
//     }
//     if (this.state.loading) {
//       orderSummary = <Spinner />;
//     }

//     return (
//       <Aux>
//         <Modal
//           show={this.state.purchasing}
//           modalClosed={this.purchaseCancleHandler}
//         >
//           {orderSummary}
//         </Modal>
//         {burger}
//       </Aux>
//     );
//   }
// }
// export default withErrorHandler(BurgerBuilder, axios);

import React, { useState, useEffect } from "react";

import Aux from "../../hoc/Auxilary/Auxialry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";

import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const burgerBuilder = (props) => {
  //   constructor (rops){
  // super (props);
  // this.state={...}
  //   }
  // state = {
  //   ingredients: null,
  //   totalPrice: 4,
  //   purchasable: false,
  //   purchasing: false,
  //   loading: false,
  //   error: false,
  // };

  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(4);
  const [purchasable, setPurchasable] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://react-burger-72a67-default-rtdb.firebaseio.com/ingredients.json"
      )
      .then((response) => {
        //this.setState({ ingredients: response.data });
        setIngredients(response.data);
      })
      .catch((error) => {
        //this.setState({ error: true });
        setError(true);
      }, []);
  }, []);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    //this.setState({ purchasable: sum > 0 });
    setPurchasable(sum > 0);
  };
  const addIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice + priceAddition;
    // this.setState({
    //   totalPrice: newPrice,
    //   ingredients: updatedIngredients,
    // });
    setIngredients(updatedIngredients);
    setTotalPrice(newPrice);
    updatePurchaseState(updatedIngredients);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...ingredients,
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = INGREDIENT_PRICES[type];
    const oldPrice = totalPrice;
    const newPrice = oldPrice - priceDeduction;
    // this.setState({
    //   totalPrice: newPrice,
    //   ingredients: updatedIngredients,
    // });
    setIngredients(updatedIngredients);
    setTotalPrice(newPrice);
    updatePurchaseState(updatedIngredients);
  };

  const purchaseHandler = () => {
    //this.setState({ purchasing: true });
    setPurchasing(true);
  };

  const purchaseCancleHandler = () => {
    //this.setState({ purchasing: false });
    setPurchasing(false);
  };

  const purchaseContinueHandler = () => {
    //alert('you continue!!');

    const queryParams = [];
    for (let i in ingredients) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i])
      );
    }
    queryParams.push("price=" + totalPrice);
    const queryString = queryParams.join("&");
    props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
    setLoading(true);
  };

  const disableInfo = {
    ...ingredients,
  };
  for (let key in disableInfo) {
    disableInfo[key] = disableInfo[key] <= 0;
  }
  let orderSummary = null;
  let burger = error ? <p>ingredients can't be loaded</p> : <Spinner />;

  if (ingredients) {
    burger = (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={addIngredientHandler}
          ingredientDeducted={removeIngredientHandler}
          disabled={disableInfo}
          purchasable={purchasable}
          ordered={purchaseHandler}
          price={totalPrice}
        />
      </Aux>
    );
    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        purchaseCanceled={purchaseCancleHandler}
        purchaseContinued={purchaseContinueHandler}
        price={totalPrice}
      />
    );
  }
  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={purchasing} modalClosed={purchaseCancleHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Aux>
  );
};
export default withErrorHandler(burgerBuilder, axios);
