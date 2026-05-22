import React, { useState } from "react";

const initialProducts = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 1999,
        image:
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800",
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 3499,
        image:
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800",
    },
    {
        id: 3,
        name: "Gaming Mouse",
        price: 899,
        image:
            "https://images.unsplash.com/photo-1527814050087-3793815479db?q=80&w=800",
    },
];

const CartPage = () => {
    const [cart, setCart] = useState([]);

    // ADD TO CART
    const addToCart = (product) => {
        setCart((prev) => {
            const exist = prev.find((p) => p.id === product.id);

            if (exist) {
                return prev.map((p) =>
                    p.id === product.id
                        ? { ...p, qty: p.qty + 1 }
                        : p
                );
            }

            return [...prev, { ...product, qty: 1 }];
        });
    };

    // REMOVE
    const removeItem = (id) => {
        setCart((prev) => prev.filter((p) => p.id !== id));
    };

    // QTY UPDATE
    const updateQty = (id, qty) => {
        if (qty < 1) return;
        setCart((prev) =>
            prev.map((p) =>
                p.id === id ? { ...p, qty } : p
            )
        );
    };

    const total = cart.reduce(
        (acc, item) => acc + item.price * item.qty,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 px-4 lg:px-10 py-10">

            {/* PAGE TITLE */}
            <h1 className="text-3xl font-bold mb-8">
                Shopping Cart
            </h1>

            <div className="grid lg:grid-cols-3 gap-8">

                {/* LEFT: PRODUCTS + CART */}
                <div className="lg:col-span-2 space-y-6">

                    {/* PRODUCTS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Products
                        </h2>

                        <div className="grid md:grid-cols-2 gap-4">
                            {initialProducts.map((p) => (
                                <div
                                    key={p.id}
                                    className="bg-white rounded-xl shadow-sm border p-4 flex gap-4"
                                >
                                    <img
                                        src={p.image}
                                        className="w-20 h-20 object-cover rounded-lg"
                                    />

                                    <div className="flex-1">
                                        <h3 className="font-semibold">
                                            {p.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm">
                                            ₹{p.price}
                                        </p>

                                        <button
                                            onClick={() => addToCart(p)}
                                            className="mt-3 px-3 py-2 text-sm bg-black text-white rounded-lg hover:bg-gray-800"
                                        >
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CART ITEMS */}
                    <div>
                        <h2 className="text-xl font-semibold mb-4">
                            Your Cart
                        </h2>

                        {cart.length === 0 ? (
                            <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
                                Your cart is empty 🛒
                            </div>
                        ) : (
                            <div className="space-y-4">

                                {cart.map((item) => (
                                    <div
                                        key={item.id}
                                        className="bg-white border rounded-xl p-4 flex items-center justify-between"
                                    >

                                        {/* LEFT INFO */}
                                        <div className="flex items-center gap-4">
                                            <img
                                                src={item.image}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />

                                            <div>
                                                <h3 className="font-semibold">
                                                    {item.name}
                                                </h3>
                                                <p className="text-gray-500 text-sm">
                                                    ₹{item.price}
                                                </p>
                                            </div>
                                        </div>

                                        {/* QTY CONTROLS */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() =>
                                                    updateQty(item.id, item.qty - 1)
                                                }
                                                className="w-8 h-8 bg-gray-100 rounded-lg"
                                            >
                                                -
                                            </button>

                                            <span className="w-6 text-center">
                                                {item.qty}
                                            </span>

                                            <button
                                                onClick={() =>
                                                    updateQty(item.id, item.qty + 1)
                                                }
                                                className="w-8 h-8 bg-gray-100 rounded-lg"
                                            >
                                                +
                                            </button>
                                        </div>

                                        {/* REMOVE */}
                                        <button
                                            onClick={() => removeItem(item.id)}
                                            className="text-red-500 text-sm"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}

                            </div>
                        )}
                    </div>
                </div>

                {/* RIGHT: ORDER SUMMARY (STICKY STYLE) */}
                <div className="bg-white border rounded-xl p-6 h-fit sticky top-10 shadow-sm">

                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>

                    <div className="space-y-2 text-gray-600 text-sm">
                        <div className="flex justify-between">
                            <span>Items</span>
                            <span>{cart.length}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>₹{total}</span>
                        </div>

                        <div className="flex justify-between">
                            <span>Delivery</span>
                            <span className="text-green-600">Free</span>
                        </div>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>₹{total}</span>
                    </div>

                    <button className="w-full mt-5 bg-black text-white py-3 rounded-xl hover:bg-gray-800 transition">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;