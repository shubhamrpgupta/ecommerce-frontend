import { AiFillDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Cart = () => {

    const { cartItems, subTotal, shipping, tax, total } = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const increment = (id) => {
        dispatch({
            type: "addToCart",
            payload: { id }
        });
        dispatch({ type: "calculateCartPrice" });
    }

    const decrement = (id) => {
        dispatch({
            type: "decrementFromCart",
            payload: id
        });
        dispatch({ type: "calculateCartPrice" });
    }

    const itemDeleteHandler = (id) => {
        dispatch({
            type: "deleteFromCart",
            payload: id
        });
        dispatch({ type: "calculateCartPrice" });
    }

    return (
        <div className="cart">
            <main>
                {cartItems.length > 0 ? (
                    cartItems.map((i) => (
                        <CartItemCard key={i.id} imgSrc={i.imgSrc} name={i.name}
                            price={i.price} qty={i.quantity} id={i.id}
                            decrement={decrement} increment={increment}
                            itemDeleteHandler={itemDeleteHandler}
                        />
                    ))
                ) : (
                    <h1>No Items Yet</h1>
                )
                }
            </main>
            <aside>
                <h2>Subtotal:${subTotal}</h2>
                <h2>Shipping:${shipping}</h2>
                <h2>Tax:${tax}</h2>
                <h2>Total:${total}</h2>
            </aside>
        </div>
    )
}

const CartItemCard = ({ imgSrc, name, price, qty, decrement, increment, itemDeleteHandler, id }) => (
    <div className="cartItemCard">
        < img src={imgSrc} alt="Item" />
        <article>
            <h3>{name}</h3>
            <p>${price}</p>
        </article>
        <div>
            <button onClick={() => decrement(id)}>-</button>
            <p>{qty}</p>
            <button onClick={() => increment(id)}>+</button>
        </div>
        <AiFillDelete onClick={() => itemDeleteHandler(id)} />
    </div>

)

export default Cart