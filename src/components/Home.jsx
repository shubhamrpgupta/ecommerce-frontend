import { toast } from "react-hot-toast";
import ProductCard from "./ProductCard";
import { useDispatch } from "react-redux";


const img1 = "https://m.media-amazon.com/images/I/71TPda7cwUL._SL1500_.jpg"
const img2 = "https://m.media-amazon.com/images/I/81dT7CUY6GL._SL1500_.jpg"

const Home = () => {

    const productList = [{
        name: "Mac book", price: 10000, imgSrc: img1, id: "sdlkfgjlakiu"
    }, {
        name: "Iphone", price: 500, imgSrc: img2, id: "sdlkfgiu"
    }];

    const dispatch = useDispatch();

    const addToCartHandler = (options) => {
        dispatch({ type: "addToCart", payload: options });
        dispatch({ type: "calculateCartPrice" });
        toast.success("Added To Cart");
    }

    return (
        <div className="home" >
            {productList.map(i => (
                <ProductCard
                    key={i.id}
                    imgSrc={i.imgSrc}
                    name={i.name}
                    price={i.price}
                    id={i.id}
                    handler={addToCartHandler}
                />
            ))}
        </div>
    )
}
export default Home