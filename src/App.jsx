import { useEffect, useState } from "react"; // Importing 
import CartCard from "./Components/CartCard"; // Importing 
import "./assets/style.css"; // importing our style 
import { // importing items from the reducer 
  saveAllProducts,
  quantityChange,
  updateSubTotal,
  updateTotal,
} from "./Redux/Reducers/Cart";
import videoSource from "./Components/video/phone.mp4";
import { useDispatch, useSelector } from "react-redux"; // importing 

// DISPATCH 
// Dispatch = hook that gives you access to the dispatch function of the Redux store. 
// It is typically used in functional components to DISPATCH  actions to UPDATE THE STATE managed by Redux.

// USE SELECTOR 
// useSelector hook - that allows you to EXTRACT DATA from the REDUX STORE  state in a React component

function App() {
  const dispatcher = useDispatch(); // Declaring the Dispatcher 
  
  // Fetching the data from the store - Declaring the items needed - to use it to display 
  const {
    items = [], // Declaring the array for the variable or anytype - is DEFAULT VALUE TYPE - In order to avoid the influenced 
    subTotal = 0,
    total = 0,
  } = useSelector((store) => store.Cart);


  const [shipping] = useState(20); // Setting the shipping value in the state 


  // Fetching the data and dispatching it to the Save all products - which is declared in the reducer 
  useEffect(() => {
    fetch("http://localhost:5173/products.json")
      .then((response) => response.json())
      .then((result) => {
        dispatcher(saveAllProducts(result.products));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // When ever the item changes the value - it should change the subtotal 

  useEffect(() => {
    if (items.length > 0) {
      let subTotal = 0;
      items.forEach((element) => {
        subTotal += element.price * element.quantity;
        dispatcher(updateSubTotal(subTotal));
      });
      if (shipping > 0) {
        subTotal += shipping;
      }
      dispatcher(updateTotal(subTotal));
    }
  }, [items]); // passing the variable 

  return (
    <div className="container">
      <video autoPlay loop muted className="background-video">
      <source src={videoSource} type="video/mp4" />
    </video>
      <div className="cart-items-container py-5 divider">
              {items.map((item, index) => (   // items fetched using the selector is rendered here - By: using the cart card component
          <CartCard
            key={`${item.title}-${index}`} // setting key
            data={item}
            dispatcher={dispatcher}
            quantityChange={quantityChange}
          />
        ))}
      </div>
      <div className="py-5 divider">
        <div className="row mb-3">
          <div className="col-6">SUBTOTAL</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${subTotal}</b>
          </div>
        </div>
        <div className="row">
          <div className="col-6">SHIPPING</div>
          <div className="col-6  d-flex justify-content-end">
            <b>{shipping > 0 ? `$${shipping}` : "FREE"}</b>
          </div>
        </div>
      </div>
      <div className="py-5 divider">
        <div className="row mb-3">
          <div className="col-6">TOTAL:</div>
          <div className="col-6 d-flex justify-content-end">
            <b>${total}</b>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
