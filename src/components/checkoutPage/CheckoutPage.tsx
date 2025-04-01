"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Link from "next/link";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function CheckoutPage() {
    const cartItems = useSelector((state: RootState) => state.cart.cartItems);
    const taxRate = 0.10; // 10% tax
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const taxAmount = subtotal * taxRate;
    const totalPrice = subtotal + taxAmount;

    // Validation Schema using Yup
    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        address: Yup.string().required("Address is required"),
        city: Yup.string().required("City is required"),
        zipCode: Yup.string()
            .matches(/^\d{5}$/, "ZIP Code must be exactly 5 digits")
            .required("ZIP Code is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
    });

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <h1 className="text-3xl font-bold mb-6">Checkout 🛍️</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Billing & Shipping Form */}
                <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-lg border">
                    <h2 className="text-xl font-semibold mb-4">Billing & Shipping Details</h2>

                    <Formik
                        initialValues={{
                            fullName: "",
                            email: "",
                            address: "",
                            city: "",
                            zipCode: "",
                            phone: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            alert("Order placed successfully! 🎉");
                            console.log("Order Details:", values);
                            resetForm();
                        }}
                    >
                        <Form className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-gray-700 font-medium">Full Name</label>
                                <Field
                                    type="text"
                                    name="fullName"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                                <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-gray-700 font-medium">Email</label>
                                <Field
                                    type="email"
                                    name="email"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-gray-700 font-medium">Address</label>
                                <Field
                                    type="text"
                                    name="address"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* City & ZIP Code */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 font-medium">City</label>
                                    <Field
                                        type="text"
                                        name="city"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                    <ErrorMessage name="city" component="div" className="text-red-500 text-sm" />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-medium">ZIP Code</label>
                                    <Field
                                        type="text"
                                        name="zipCode"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                    <ErrorMessage name="zipCode" component="div" className="text-red-500 text-sm" />
                                </div>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-gray-700 font-medium">Phone Number</label>
                                <Field
                                    type="text"
                                    name="phone"
                                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                />
                                <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="mt-4 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600"
                            >
                                Place Order
                            </button>
                        </Form>
                    </Formik>
                </div>

                {/* Order Summary */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                    <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                    <div className="space-y-4">
                        {cartItems.map((item: any) => (
                            <div key={item.id} className="flex justify-between items-center">
                                <span className="text-gray-700">{item.productName} x {item.quantity}</span>
                                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    {/* Pricing Breakdown */}
                    <div className="border-t mt-4 pt-4 space-y-2 text-gray-700 font-semibold">
                        <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Taxes (10%):</span>
                            <span>${taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between text-lg font-bold">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <p className="text-sm text-gray-500 mt-2">Shipping and taxes calculated at checkout.</p>

                        <button className="mt-4 w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600">
                            Proceed to Payment
                        </button>

                </div>
            </div>
        </div>
    );
}
