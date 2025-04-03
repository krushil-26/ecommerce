"use client";

import { getUserProfile, updateUserProfile } from "@/frontendApi/auth";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function ProfilePage() {
  const [profileData, setProfileData] = useState<any>({})

  useEffect(() => {
    async function fetchProfile() {
      try {
        const data = await getUserProfile();
        setProfileData(data?.data);
      } catch (err: any) {
        console.log(err.message);
      }
    }
    fetchProfile();
  }, []);

  // Validation Schema
  const profileSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    oldPassword: Yup.string(),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters"),
      // .required("New password is required")
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      ,
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
        Profile Settings
      </h2>

      {/* Profile & Password Form */}
      <Formik
        initialValues={{
          name: profileData.name || "",
          email: profileData?.email || "",
          oldPassword: "",
          newPassword: "",
          confirmPassword: "",
        }}
        validationSchema={profileSchema}
        onSubmit={async (values) => {
          try {
            await updateUserProfile(values);
            alert("Profile updated successfully!");
          } catch (err: any) {
            console.log(err.message);
          }
        }}
        enableReinitialize  
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-gray-700">Name</label>
              <Field
                type="text"
                name="name"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
                placeholder="Enter Name"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="Enter Email"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
            </div>

            <hr className="border-gray-300 my-4" />

            <h3 className="text-xl font-semibold text-gray-800">Change Password</h3>

            {/* Old Password */}
            <div>
              <label className="block text-gray-700">Old Password</label>
              <Field
                type="password"
                name="oldPassword"
                placeholder="Enter Old Password"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <ErrorMessage name="oldPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* New Password */}
            <div>
              <label className="block text-gray-700">New Password</label>
              <Field
                type="password"
                name="newPassword"
                placeholder="Enter New Password"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <ErrorMessage name="newPassword" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-700">Confirm Password</label>
              <Field
                type="password"
                name="confirmPassword"
                placeholder="Enter Confirm Password"
                className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
              />
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm" />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              disabled={isSubmitting}
            >
              Save Changes
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
