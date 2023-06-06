import React, { useEffect } from "react";
// import useToken from "@galvanize-inc/jwtdown-for-react";
// import useCart from "../custom-hooks/useUser";
import "../cart.css";
import { Link } from "react-router-dom";
async function CartView() {
  //   const [price, setPrice] = useState(0);
  // const [CartView, setCartView] = useState([]);
  useEffect(() => {
    CartView();
    // eslint-disable-next-line
  }, []);
  // async function loadCartView() {
  // const response = await fetch(`${process.env.REACT_APP_SAMPLE_SERVICE_API_HOST}/cart/${user_id}`);

  // if (response.ok) {
  //   const data = await response.json();
  //   console.log(data);
  //   CartView(data);
  // } else {
  //   console.error("error");
  // }

  // const [carts, setCarts] = useState([]);
  //   const handlePrice = () => {
  //     let ans = 0;
  //     useCart.map((cart) => (ans += quantity * cart.price));
  //     setPrice(ans);
  //   };
  //   useEffect(() => {
  //     handlePrice();
  //   });
  //   const handleNoChange = (event) => {
  //     const value = event.target.value;
  //     // setNo(value);
  //   };
  //   const handleRemove = (event) => {
  //     const value = event.target.value;
  //     // set(value);
  //   };
  //   async function handleAdd(id) {
  //     return (cart.quantity += 1);
  //   }
  //   async function handleDelete(id) {
  //     return (cart.quantity -= 1);
  //   }
  // async function handleRemove(id) {
  // delete cart.id;
  // }
  //     <><><template>
  //         <div class="container mx-auto grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 pt-6 gap-8">
  //             <div class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-24"></div>
  //             <div class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-24"></div>
  //             <div class="rounded border-gray-300 dark:border-gray-700 border-dashed border-2 h-24"></div>
  //         </div>
  //     </template><script></script></></>
  //   </>;
  return (
    <>
      <div>
        <Link to="/cart/:userid" className="btn btn-primary">
          Shopping Cart
        </Link>
      </div>
      <article>
        {CartView?.map((cart) => (
          <div className="cart--box--id" key={cart.id}>
            <div
              className="box--large"
              style={{ backgroundColor: "lightblue" }}
            >
              <p>{cart.listing}</p>
            </div>
          </div>
        ))}
      </article>
    </>
  );
}

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
/* <div>
  <button onClick={() => handleAdd(cart.quantity, "+")}>Add</button>
  <button>+</button>
  <button>{cart.quantity}</button>
  <button onClick={() => handleDelete(cart.quantity, "-")}>-</button>
</div>; */
