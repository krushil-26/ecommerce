import Link from 'next/link';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import latestProducts from "@/jsonData/products.json"
import ProductCard from '@/common/productCard/ProductCard';

const TopRatedProducts = () => {
    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    return (
        <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-extrabold text-gray-800 uppercase border-b-4 border-blue-500 pb-2">
                    Top Rated Products
                </h3>

                <Link
                    href="/products"
                    className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg shadow-md hover:bg-orange-600 transition duration-300"
                >
                    View All
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {latestProducts.slice(0, 4).map((product: any, index) => (
                    <ProductCard product={product} index={index} key={index} />
                ))}
            </div>
        </section>
    );
};

export default TopRatedProducts;
