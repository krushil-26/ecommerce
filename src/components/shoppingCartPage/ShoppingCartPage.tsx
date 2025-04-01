"use client";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { increaseQuantity, decreaseQuantity, removeFromCart } from "@/redux/cartSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ShoppingCartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const router = useRouter()

    // Calculate total price
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {cartItems.length === 0 ? (
                <div className="text-center text-gray-600">
                    <p>Your cart is empty.</p>
                    <Link href="/" className="text-orange-500 font-semibold mt-4 block">
                        Continue Shopping →
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Cart Items List */}
                    <div className="md:col-span-2 space-y-6">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="flex items-center border p-4 rounded-lg shadow">
                                <img 
                                    src={"https://cdn.linenclub.com/media/catalog/product/cache/d8d099ed0f54be45d4eb2c71c1a3b40d/c/o/comph001pd01960-g3_0_1.jpg"} 
                                    alt={item.productName} 
                                    className="w-24 h-24 object-cover rounded" 
                                />
                                
                                <div className="ml-4 flex-grow">
                                    <h2 className="text-lg font-semibold">{item.productName}</h2>
                                    <p className="text-gray-500">{item.productCategory}</p>

                                    {/* Price & Cross Price */}
                                    <div className="flex items-center space-x-2">
                                        <p className="text-orange-500 font-semibold">${item.price.toFixed(2)}</p>
                                        <p className="text-gray-500 line-through">${item.crossPrice.toFixed(2)}</p>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="mt-3 flex items-center space-x-4">
                                        <button
                                            onClick={() => dispatch(decreaseQuantity(item.id))}
                                            className="px-3 py-1 bg-gray-300 rounded font-bold text-lg"
                                        >
                                            -
                                        </button>
                                        <span className="text-lg font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch(increaseQuantity(item.id))}
                                            className="px-3 py-1 bg-gray-300 rounded font-bold text-lg"
                                        >
                                            +
                                        </button>

                                        {/* Remove Button */}
                                        <button
                                            onClick={() => dispatch(removeFromCart(item.id))}
                                            className="ml-4 text-red-500 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="bg-white p-6 rounded-lg shadow-lg border">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="flex justify-between text-gray-700">
                            <span>Subtotal:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <p className="text-sm text-gray-500 mt-2">Shipping and taxes calculated at checkout.</p>
                        
                        <button onClick={() => router.push("/checkout")} className="mt-4 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
