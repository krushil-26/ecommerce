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
                src={"https://cdn.linenclub.com/media/catalog/product/cache/d8d099ed0f54be45d4eb2c71c1a3b40d/c/o/comph001pd01960-g3_0_1.jpg"}
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
