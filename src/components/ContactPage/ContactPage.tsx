"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Mail, MapPin } from "lucide-react";

export default function ContactPage() {
    // Validation Schema
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email").required("Email is required"),
        phone: Yup.string()
            .matches(/^\d{10}$/, "Phone number must be exactly 10 digits")
            .required("Phone number is required"),
        message: Yup.string().min(10, "Message must be at least 10 characters").required("Message is required"),
    });

    return (
        <div className="max-w-7xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-lg text-gray-600 text-center mb-8">
                Have questions? Fill out the form below or reach out to us directly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Side: Contact Form */}
                <div className="bg-white p-6 rounded-lg shadow-lg border">
                    <h2 className="text-xl font-semibold mb-4">Get in Touch</h2>
                    <Formik
                        initialValues={{ name: "", email: "", phone: "", message: "" }}
                        validationSchema={validationSchema}
                        onSubmit={(values, { resetForm }) => {
                            console.log("Form Data:", values);
                            alert("Your message has been sent!");
                            resetForm();
                        }}
                    >
                        {({ isSubmitting }) => (
                            <Form className="space-y-4">
                                {/* Name */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Name</label>
                                    <Field
                                        type="text"
                                        name="name"
                                        placeholder="Enter Name"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Email</label>
                                    <Field
                                        type="email"
                                        name="email"
                                        placeholder="Enter Email"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                    <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Phone Number */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Phone Number</label>
                                    <Field
                                        type="text"
                                        name="phone"
                                        placeholder="Enter Phone Number"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                    <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Message */}
                                <div>
                                    <label className="block text-gray-700 font-medium">Message</label>
                                    <Field
                                        as="textarea"
                                        name="message"
                                        rows="4"
                                        placeholder="Enter Message"
                                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-orange-500"
                                    />
                                    <ErrorMessage name="message" component="div" className="text-red-500 text-sm" />
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600"
                                >
                                    Send Message
                                </button>
                            </Form>
                        )}
                    </Formik>
                </div>

                {/* Right Side: Contact Details */}
                <div className="bg-white p-6 rounded-lg shadow-lg border h-[180px]">

                    {/* LOCATION Section */}
                    <div className="mb-4">
                        <div className="flex items-center text-orange-500 font-semibold">
                            <MapPin className="mr-2 w-5 h-5" />
                            <h3 className="text-lg">LOCATION</h3>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">
                            Ahmedabad, Gujarat, India
                        </p>
                    </div>

                    {/* EMAIL Section */}
                    <div>
                        <div className="flex items-center text-orange-500 font-semibold">
                            <Mail className="mr-2 w-5 h-5" />
                            <h3 className="text-lg">EMAIL</h3>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">kthakkar2608@gmail.com</p>
                    </div>
                </div>


            </div>
        </div>
    );
}
