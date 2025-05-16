"use client";
import { notFound } from "next/navigation";
import { useEffect, useState, use } from "react";
import allProducts from "@/jsonData/products.json";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, increaseQuantity, decreaseQuantity } from "@/redux/cartSlice";
import { RootState } from "@/redux/store";

export default function ProductDetails({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params); // Unwrapping params
    const productId = Number(resolvedParams.id);

    const [cart, setCart] = useState<any[]>([]);
    const [quantity, setQuantity] = useState(0);

    const dispatch = useDispatch();
    const cartItems: any = useSelector((state: RootState) => state.cart.cartItems);

    const cartItem: any = cartItems.find((item: any) => item.id === productId);

    const product: any = allProducts.find((p: any) => p.id === productId);

    if (!product) {
        return notFound(); // Show 404 if product not found
    }

    // useEffect(() => {
    //     const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    //     setCart(storedCart);

    //     // Check if this product is already in the cart
    //     const existingProduct = storedCart.find((item: any) => item.id === product.id);
    //     if (existingProduct) {
    //         setQuantity(existingProduct.quantity);
    //     }
    // }, []);

    // useEffect(() => {
    //     if (cart.length > 0) {
    //         localStorage.setItem("cart", JSON.stringify(cart));
    //     }
    // }, [cart]);


    // const addToCart = () => {
    //     // const newCart = [...cart, { ...product, quantity: 1 }];
    //     // setCart(newCart);
    //     // setQuantity(1);

    // };

    const updateQuantity = (amount: number) => {
        // const newCart = cart.map((item: any) => {
        //     if (item.id === product.id) {
        //         return { ...item, quantity: item.quantity + amount };
        //     }
        //     return item;
        // });

        // const updatedCart = newCart.filter((item: any) => item.quantity > 0);
        // setCart(updatedCart);
        // setQuantity((prev) => prev + amount);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Product Image */}
                <div className="flex justify-center">
                    <div className="relative group">
                        <img
                            src={product?.productImage}
                            alt={product.productName}
                            className="w-[350px] h-[400px] object-cover rounded-lg shadow-lg transition-transform group-hover:scale-105"
                        />
                    </div>
                </div>

                {/* Product Details */}
                <div>
                    <h1 className="text-3xl font-bold">{product.productName}</h1>
                    <p className="text-gray-600 text-lg mt-1">{product.productCategory}</p>

                    {/* Ratings */}
                    <div className="mt-2 flex items-center">
                        <span className="text-yellow-500 text-lg font-semibold">⭐ {product.ratings} / 5</span>
                        <span className="ml-2 text-gray-500 text-sm">({product.reviews?.length} Reviews)</span>
                    </div>

                    {/* Price Section */}
                    <p className="text-2xl font-semibold text-orange-600 mt-4">
                        ${product.price}{" "}
                        <span className="text-gray-500 line-through text-lg">${product.crossPrice}</span>
                        <span className="ml-2 bg-green-100 text-green-600 text-sm px-2 py-1 rounded">
                            {product.discountPercentage}% OFF
                        </span>
                    </p>

                    {/* Availability */}
                    <p className="mt-2 text-sm font-semibold text-green-600">{product.availability}</p>

                    <div className="mt-6">
                        {cartItem ? (
                            <div className="flex items-center mt-6 space-x-4">
                                <button
                                    onClick={() => dispatch(decreaseQuantity(product.id))}
                                    className="px-3 py-2 bg-gray-300 rounded-lg font-bold text-lg"
                                >
                                    -
                                </button>
                                <span className="text-xl font-semibold">{cartItem.quantity}</span>
                                <button
                                    onClick={() => dispatch(increaseQuantity(product.id))}
                                    className="px-3 py-2 bg-gray-300 rounded-lg font-bold text-lg"
                                >
                                    +
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => dispatch(addToCart({ ...product, quantity: 1 }))}
                                className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 px-5 rounded-lg hover:bg-orange-600 transition-transform hover:scale-105"
                            >
                                Add to Cart
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Product Details Table */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-4">Product Details</h2>
                <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                    <tbody>
                        <tr className="border-b">
                            <td className="px-4 py-3 font-semibold bg-gray-100">Material</td>
                            <td className="px-4 py-3">{product.material}</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-semibold bg-gray-100">Description</td>
                            <td className="px-4 py-3">{product.productDescription}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            {/* Product Reviews */}
            <div className="mt-12">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <div className="mt-4">
                    {product.reviews && product.reviews.length > 0 ? (
                        product.reviews.map((review: any, index: any) => (
                            <div key={index} className="border-b pb-3 mb-3">
                                <p className="font-semibold">{review.user}</p>
                                <p className="text-yellow-500 text-sm">⭐ {review.rating} / 5</p>
                                <p className="text-gray-700">{review.comment}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No reviews yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
