import React, { useState, useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const orders = (props) => {
  //   state = {
  //     orders: [],
  //     loading: true,
  //   };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/orders.json")
      .then((res) => {
        const fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        //this.setState({ loading: false, orders: fetchedOrders });
        setLoading(false);
        setOrders(fetchedOrders);
      })
      .catch((err) => {
        // this.setState({ loading: false });
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ))}
    </div>
  );
};

export default withErrorHandler(orders, axios);
