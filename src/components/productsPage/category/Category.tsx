"use client";
import { useEffect, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import allProducts from "@/jsonData/products.json";
import ProductCard from '@/common/productCard/ProductCard';

const categories = ["Men's Clothing", "Women's Clothing", "Footwear", "Accessories"];
const priceRanges = [
    { label: "$0 - $40", min: 0, max: 40 },
    { label: "$40 - $60", min: 40, max: 60 },
    { label: "$60 - $80", min: 60, max: 80 },
    { label: "$80 - $100", min: 80, max: 100 },
];

const sortOptions = [
    { label: "Price: Low to High", value: "priceLowToHigh" },
    { label: "Price: High to Low", value: "priceHighToLow" },
    { label: "Rating", value: "rating" },
    { label: "A - Z by Name", value: "name" },
];

export default function Categories() {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedPriceRanges, setSelectedPriceRanges] = useState<any[]>([]);
    const [filteredProducts, setFilteredProducts] = useState(allProducts);
    const [sortBy, setSortBy] = useState("");

    useEffect(() => {
        AOS.init({ duration: 800 });
    }, []);

    // Handle category selection
    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
        );
    };

    // Handle price range selection
    const handlePriceChange = (range: any) => {
        setSelectedPriceRanges((prev) =>
            prev.includes(range) ? prev.filter((r) => r !== range) : [...prev, range]
        );
    };

    // Apply filters
    const applyFilters = () => {
        let filtered = allProducts;

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) => selectedCategories.includes(product.productCategory));
        }

        // Filter by selected price ranges
        if (selectedPriceRanges.length > 0) {
            filtered = filtered.filter((product) =>
                selectedPriceRanges.some(
                    (range) => product.price >= range.min && product.price <= range.max
                )
            );
        }

        // Apply sorting
        if (sortBy) {
            filtered = sortProducts(filtered, sortBy);
        }

        setFilteredProducts(filtered);
    };

    // Sort Products
    const sortProducts = (products: any[], criteria: string) => {
        return [...products].sort((a, b) => {
            switch (criteria) {
                case "priceLowToHigh":
                    return a.price - b.price;
                case "priceHighToLow":
                    return b.price - a.price;
                case "rating":
                    return b.ratings - a.ratings;
                case "name":
                    return a.productName.localeCompare(b.productName);
                default:
                    return 0;
            }
        });
    };

    // Handle sort change
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedSort = e.target.value;
        setSortBy(selectedSort);

        // Apply sorting immediately
        setFilteredProducts((prevProducts) => sortProducts(prevProducts, selectedSort));
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 min-h-screen flex flex-col md:flex-row gap-6">
            {/* Left Sidebar - Filters */}
            <div className="w-full md:w-1/4 p-6 bg-white rounded-lg shadow-xl">
                {/* Category Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-3">Category</h3>
                    {categories.map((cat) => (
                        <label
                            key={cat}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <input
                                type="checkbox"
                                value={cat}
                                checked={selectedCategories.includes(cat)}
                                onChange={() => handleCategoryChange(cat)}
                                className="accent-blue-600 w-4 h-4"
                            />
                            <span className="text-gray-700">{cat}</span>
                        </label>
                    ))}
                </div>

                {/* Price Filter */}
                <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-600 border-b pb-2 mb-3">Price Range</h3>
                    {priceRanges.map((range) => (
                        <label
                            key={range.label}
                            className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md transition"
                        >
                            <input
                                type="checkbox"
                                value={range.label}
                                checked={selectedPriceRanges.includes(range)}
                                onChange={() => handlePriceChange(range)}
                                className="accent-blue-600 w-4 h-4"
                            />
                            <span className="text-gray-700">{range.label}</span>
                        </label>
                    ))}
                </div>

                {/* Apply Button */}
                <button
                    onClick={applyFilters}
                    className="w-full bg-orange-500 text-white font-semibold py-3 rounded-lg hover:bg-orange-600 transition-all shadow-sm"
                >
                    Apply Filters
                </button>
            </div>

            {/* Right Side - Products List */}
            <div className="w-full md:w-3/4 p-4">
                {/* Sort Dropdown */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Products</h2>
                    <select
                        value={sortBy}
                        onChange={handleSortChange}
                        className="px-4 py-2 border rounded-md shadow-sm text-gray-700 bg-white focus:outline-none"
                    >
                        <option value="">Sort By</option>
                        {sortOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {filteredProducts.map((product, index) => (
                            <ProductCard product={product} index={index} key={index} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No products found.</p>
                )}
            </div>
        </div>
    );
}
