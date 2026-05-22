import React, { useState } from "react";

// Dummy wishlist product data (home appliances)
const initialWishlist = [
    {
        id: 1,
        name: "Preethi Zodiac Mixer Grinder",
        category: "Mixer",
        price: 5499,
        originalPrice: 6999,
        image: "https://images.unsplash.com/photo-1585515325310-ee0f978ce5ae?auto=format&fit=crop&w=500&q=80",
        stock: 12,
    },
    {
        id: 2,
        name: "Bajaj Wet Grinder (2L)",
        category: "Grinder",
        price: 4299,
        originalPrice: 5999,
        image: "https://images.unsplash.com/photo-1585515386552-4b7c9e7c9c9f?auto=format&fit=crop&w=500&q=80",
        stock: 5,
    },
    {
        id: 3,
        name: "Storage Basket – Bamboo (3 Tier)",
        category: "Baskets",
        price: 899,
        originalPrice: 1299,
        image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=300&h=300&fit=crop",
        stock: 20,
    },
    {
        id: 4,
        name: "Plastic Storage Box Set (5 pcs)",
        category: "Boxes",
        price: 1299,
        originalPrice: 1999,
        image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=300&h=300&fit=crop",
        stock: 8,
    },
    {
        id: 5,
        name: "Philips Hand Blender",
        category: "Home Appliances",
        price: 3499,
        originalPrice: 4999,
        image: "https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=300&h=300&fit=crop",
        stock: 3,
    },
    {
        id: 6,
        name: "Iron Mesh Basket (Set of 2)",
        category: "Baskets",
        price: 649,
        originalPrice: 999,
        image: "https://images.unsplash.com/photo-1610348725520-eb1c5e4d1a2e?w=300&h=300&fit=crop",
        stock: 15,
    },
];

const WishList = () => {
    const [wishlistItems, setWishlistItems] = useState(initialWishlist);

    // Remove item from wishlist
    const removeFromWishlist = (id) => {
        setWishlistItems((prev) => prev.filter((item) => item.id !== id));
    };

    // Add to cart (dummy action)
    const addToCart = (product) => {
        alert(`Added ${product.name} to cart!`);
        // You can integrate your actual cart logic here
    };

    // Move all to cart (optional)
    const moveAllToCart = () => {
        if (wishlistItems.length === 0) return;
        alert(`Added ${wishlistItems.length} items to cart.`);
        setWishlistItems([]); // clear wishlist after moving
    };

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
                        <p className="text-gray-500 mt-1">
                            {wishlistItems.length} item{wishlistItems.length !== 1 ? "s" : ""} saved
                        </p>
                    </div>
                    {wishlistItems.length > 0 && (
                        <button
                            onClick={moveAllToCart}
                            className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                        >
                            Move All to Cart
                        </button>
                    )}
                </div>

                {/* Wishlist Grid */}
                {wishlistItems.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-sm text-center py-16">
                        <div className="text-6xl mb-4">❤️</div>
                        <h2 className="text-xl font-semibold text-gray-800">Your wishlist is empty</h2>
                        <p className="text-gray-500 mt-1">Browse our products and add items you love.</p>
                        <button
                            onClick={() => (window.location.href = "/shop")}
                            className="mt-6 inline-block bg-black text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-800"
                        >
                            Continue Shopping
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                        {wishlistItems.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col"
                            >
                                {/* Product Image */}
                                <div className="relative h-52 bg-gray-100">
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Discount badge */}
                                    {product.originalPrice && (
                                        <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                                            {Math.round(
                                                ((product.originalPrice - product.price) /
                                                    product.originalPrice) *
                                                100
                                            )}
                                            % OFF
                                        </span>
                                    )}
                                </div>

                                {/* Product Details */}
                                <div className="p-4 flex flex-col flex-grow">
                                    <div>
                                        <h3 className="font-semibold text-gray-800 text-lg line-clamp-1">
                                            {product.name}
                                        </h3>
                                        <p className="text-xs text-gray-500 mt-0.5 capitalize">
                                            {product.category}
                                        </p>
                                    </div>

                                    {/* Price */}
                                    <div className="mt-2 flex items-baseline gap-2">
                                        <span className="font-bold text-xl text-gray-900">
                                            ₹{product.price.toLocaleString()}
                                        </span>
                                        {product.originalPrice && (
                                            <span className="text-sm text-gray-400 line-through">
                                                ₹{product.originalPrice.toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    {/* Stock info */}
                                    <p className="text-xs text-gray-500 mt-1">
                                        In stock: {product.stock} units
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="mt-4 flex gap-2">
                                        <button
                                            onClick={() => addToCart(product)}
                                            className="flex-1 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition"
                                        >
                                            Add to Cart
                                        </button>
                                        <button
                                            onClick={() => removeFromWishlist(product.id)}
                                            className="px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-500 transition"
                                            aria-label="Remove from wishlist"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default WishList;