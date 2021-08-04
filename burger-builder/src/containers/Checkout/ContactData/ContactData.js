// import React, { Component } from "react";
// import Button from "../../../components/UI/Button/Button";
// import Spinner from "../../../components/UI/Spinner/Spinner";
// import classes from "./ContactData.css";
// import axios from "../../../axios-orders";
// class ContactData extends Component {
//   state = {
//     name: "",
//     email: "",
//     address: {
//       strreet: "",
//       postalCode: "",
//     },
//     loading: false,
//   };

//   orderHandler = (event) => {
//     event.preventDefault();
//     console.log(this.props.ingredients);
//     this.setState({ loading: true });
//     const order = {
//       ingredients: this.props.ingredients,
//       price: this.props.price,
//       customer: {
//         name: "Max",
//         address: {
//           street: "phase05",
//           zipcode: "98787",
//           country: "iraq",
//         },
//         email: "max@ucev.com",
//       },
//       deliveryMode: "fastest",
//     };
//     axios
//       .post("/orders.json", order)
//       .then((response) => {
//         this.setState({ loading: false });
//         this.props.history.push("/");
//       })
//       .catch((error) => {
//         this.setState({ loading: false });
//       });
//   };

//   render() {
//     let form = (
//       <form>
//         <input
//           className={classes.Input}
//           type="text"
//           name="name"
//           placeholder="Your Name"
//         />
//         <input
//           className={classes.Input}
//           type="emali"
//           name="email"
//           placeholder="Your Emali"
//         />
//         <input
//           className={classes.Input}
//           type="text"
//           name="street"
//           placeholder="Your Street"
//         />
//         <input
//           className={classes.Input}
//           type="text"
//           name="postal"
//           placeholder="Your Postal Code"
//         />
//         <Button btnType="Success" clicked={this.orderHandler}>
//           ORDER
//         </Button>
//       </form>
//     );
//     if (this.state.loading) {
//       form = <Spinner />;
//     }
//     return (
//       <div className={classes.ContactData}>
//         <h4>Enter Your Contact Data</h4>
//         {form}
//       </div>
//     );
//   }
// }
// export default ContactData;

import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import classes from "./ContactData.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/input/input";

const contactData = (props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "your Name",
      },
      value: "",
      validation: {
        requried: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "street",
      },
      value: "",
      validation: {
        requried: true,
      },
      valid: false,
      touched: false,
    },
    zipcode: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "ZIP CODE",
      },
      value: "",
      validation: {
        requried: true,
        minlength: 5,
        maxlength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Country",
      },
      value: "",
      validation: {
        requried: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: "input",
      elementConfig: {
        type: "email",
        placeholder: "your E-Mail",
      },
      value: "",
      validation: {
        requried: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          { value: "fastest", displayValue: "Fastest" },
          { value: "cheapest", displayValue: "Cheapest" },
        ],
      },
      value: "fastest",
      validation: {},
      valid: "true",
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const orderHandler = (event) => {
    event.preventDefault();

    setLoading(true);
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    const order = {
      ingredients: props.ingredients,
      price: props.price,
      orderData: formData,
    };
    axios
      .post("/orders.json", order)
      .then((response) => {
        setLoading(false);
        props.history.push("/");
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }
  const checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.requried) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }
    if (rules.maxlength) {
      isValid = value.length <= rules.maxlength && isValid;
    }
    return isValid;
  };
  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    console.log(updatedFormElement);
    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    setFormIsValid(formIsValid);
    setOrderForm(updatedOrderForm);
  };
  let form = (
    <form onSubmit={orderHandler}>
      {formElementsArray.map((formElement) => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          shouldvalidate={formElement.config.validation}
          touched={formElement.config.touched}
          changed={(event) => inputChangeHandler(event, formElement.id)}
        />
      ))}

      <Button btnType="Success" disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter Your Contact Data</h4>
      {form}
    </div>
  );
};
export default contactData;
