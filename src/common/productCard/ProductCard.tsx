"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ProductCard = ({ product, index }: any) => {
    const router = useRouter();

    const handleRedirect = () => {
        router.push(`/products/${product.id}`);
    };

    return (
        <div
            key={index}
            className="border rounded-lg p-4 shadow-lg hover:shadow-xl transition cursor-pointer"
            data-aos="fade-up"
            onClick={handleRedirect} // Click to navigate
        >
            <Image
                // src={"https://plus.unsplash.com/premium_photo-1679056835084-7f21e64a3402?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                src={product?.productImage}
                alt={product.productName}
                width={200}
                height={200}
                className="w-full h-48 object-cover rounded-lg"
            />
            <h3 className="mt-3 text-lg font-semibold">{product.productName}</h3>
            <p className="text-sm text-gray-500">{product.productCategory}</p>
            <div className="flex items-center gap-2 mt-2">
                <span className="text-xl font-bold text-red-500">${product.price}</span>
                <span className="text-sm text-gray-400 line-through">${product.crossPrice}</span>
            </div>
            <p className="text-yellow-500">⭐ {product.ratings}</p>
        </div>
    );
};

export default ProductCard;
