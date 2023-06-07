import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useToken from "@galvanize-inc/jwtdown-for-react";
import useCart from "../custom-hooks/useUser";
//import "../cart.css";
import ReactDOM from "react-dom/client";
import { Link } from "react-router-dom";
import { createContext } from "react";
const UserContext = createContext();

function CartView() {
  //   const [price, setPrice] = useState(0);
  const [CartView, setCartView] = useState([]);
  const { user_id } = useParams();
  //console.log("id", ids);

  // useEffect ( => {
  // loadCartView();
  // }, []);
  async function loadCartView() {
    // const response = await fetch(
    //   `${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/${ids.cart_id}`
    // );
    const response = await fetch(`http://localhost:3000/cart/${user_id}`);
    if (response.ok) {
      const data = await response.json();
      //console.log(data);
      //return data;
      setCartView(data.CartView);
    } else {
      console.error("error");
    }
  }
  //}, [ids]);
  //return { CartView: CartView };

  //console.log({ CartView });

  return (
    <>
      <UserContext.Provider value={user_id}>
        <br />
        <div>
          <Link to="cart/:userid">CartView</Link>
        </div>
        <br />
      </UserContext.Provider>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Cart View</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </>
  );
}
<CartView />;

// {
//   /* {CartView?.map((CartView) => ( */
// }
// {
//   /* <tr key={CartView.id}> */
// }
// {
//   cart: cart;
// }
// {
//   /* </tr> */
// }
// {
//   /* ))} */
// }
//const root = document.getElementById("root");
//root.render(<CartView />);
// else {
//   console.error("error");
// }

//const [carts, setCarts] = useState([]);
//return { CartView: CartView };

// return (
//   <>
//     <div>
//       <Link to="/cart/:userid" className="btn btn-primary">
//         Shopping Cart
//       </Link>
//     </div>
//     <article>
//       {CartView?.map((cart) => (
//         <div className="cart--box--id" key={cart.id}>
//           <div
//             className="box--large"
//             style={{ backgroundColor: "lightblue" }}
//           >
//             <p>{ids}</p>
//             <p>{cart}</p>
//           </div>
//         </div>
//       ))}
//     </article>
//   </>
// );

export default CartView;

// <div>
//   <span>{cart.price}</span>
//   <button onClick={() => handleRemove(cart.id)}>Remove</button>
// </div>;
// {
//   /* <div className="Total">
//         <span>Total price of your cart</span>
//         <span>${price}</span>
//         </div> */
// }
//{
/* <div>
  <button onClick={() => handleAdd(cart.quantity, "+")}>Add</button>
  <button>+</button>
  <button>{cart.quantity}</button>
  <button onClick={() => handleDelete(cart.quantity, "-")}>-</button>
</div>; */
//}
