import React, { Component } from "react";

import Aux from "../../hoc/Auxilary/Auxialry";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from '../../components/UI/Modal/Modal';

import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';


const INGREDIENT_PRICES={
  salad:0.5,
  cheese:0.4,
  meat:1.3,
  bacon:0.7

 };

class BurgerBuilder extends Component {
//   constructor (rops){
// super (props);
// this.state={...}
//   }
  state={
       ingredients:null,
totalPrice:4,
purchasable:false,
 purchasing:false,
 loading:false,
 error:false
  }
componentDidMount(){
  axios.get('https://react-burger-72a67-default-rtdb.firebaseio.com/ingredients.json')
  .then(response=>{
    this.setState({ingredients:response.data});
  })
  .catch (error=>{
    this.setState({error:true})
  })
}
  updatePurchaseState(ingredients){
    
    const sum=Object.keys(ingredients)
    .map(igKey=>{
      return ingredients[igKey];
    })
    .reduce((sum,el)=>{
      return sum + el;
    },0);
    this.setState({purchasable:sum>0});
  }
  addIngredientHandler=(type)=>{
const oldCount=this.state.ingredients[type];
const updatedCount=oldCount+1;
const updatedIngredients={
  ...this.state.ingredients
};
updatedIngredients[type]=updatedCount;
const priceAddition=INGREDIENT_PRICES[type];
const oldPrice=this.state.totalPrice;
const newPrice=oldPrice+priceAddition;
this.setState({
  totalPrice:newPrice,ingredients:updatedIngredients
})
this.updatePurchaseState(updatedIngredients);
  }

  removeIngredientHandler=(type)=>
  {
    const oldCount=this.state.ingredients[type];
    if(oldCount<=0)
    {
      return;
    }
    const updatedCount=oldCount-1;
    const updatedIngredients={
      ...this.state.ingredients
    };
    updatedIngredients[type]=updatedCount;
    const priceDeduction=INGREDIENT_PRICES[type];
    const oldPrice=this.state.totalPrice;
    const newPrice=oldPrice-priceDeduction;
    this.setState({
      totalPrice:newPrice,ingredients:updatedIngredients
    })
    this.updatePurchaseState(updatedIngredients);
  }


  purchaseHandler=()=>{
    this.setState({purchasing:true});
  }
  

  purchaseCancleHandler=()=>{
this.setState({purchasing:false});
  }

  purchaseContinueHandler=()=>{
//alert('you continue!!');
this.setState({loading:true})
const order={
  ingredients:this.state.ingredients,
  price:this.state.totalPrice,
  customer:{
    name:'Max',
    address:{
      street:'phase05',
      zipcode:'98787',
      country:'iraq'
    },
    email:'max@ucev.com'
    
  },
  deliveryMode:'fastest'
}
  axios.post('/orders.json',order)
  .then(response=> {
    this.setState({loading:false,purchasing:false});
  })
  .catch(error=>{
    this.setState({loading:false,purchasing:false});
  });

}
  render() {
    const disableInfo={
      ...this.state.ingredients
    }
    for (let key in disableInfo){
      disableInfo[key]=disableInfo[key]<=0
    }
    let orderSummary=null;
    let burger=this.state.error?<p>ingredients can't be loaded</p>:<Spinner/>;

    if(this.state.ingredients){
  burger=(
    <Aux>
          <Burger ingredients={this.state.ingredients}/>
               <BuildControls
                  ingredientAdded={this.addIngredientHandler}
                  ingredientDeducted={this.removeIngredientHandler}
                  disabled={disableInfo}
                  purchasable={this.state.purchasable}
                  ordered={this.purchaseHandler}
                  price={this.state.totalPrice}/>
    </Aux>);
  orderSummary=<OrderSummary 
  ingredients={this.state.ingredients} 
  purchaseCanceled={this.purchaseCancleHandler}
  purchaseContinued={this.purchaseContinueHandler}
  price={this.state.totalPrice}
  /> 
}
if(this.state.loading){
  orderSummary=<Spinner/>;
      }
    
    return (
      <Aux>
        <Modal 
         show={this.state.purchasing}
         modalClosed={this.purchaseCancleHandler}
         >
        {orderSummary}
        </Modal>
        {burger}
         
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder,axios);

