import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { createContext, useEffect, useState } from 'react';
import { FaArrowRight, FaFrown, FaShoppingCart } from 'react-icons/fa';
import CartItem from '../components/Cart/CartItem';

interface ItemDataType {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
    quantity: number;
    unitPrice: number;
    quantityError: boolean;
}

interface CartItemType {
    itemData: ItemDataType[];
    setItemData: React.Dispatch<React.SetStateAction<ItemDataType[]>>;
    updateSubtotalPrice: () => void;
}

const CartItemContext = createContext<CartItemType | null>(null);

const Cart: NextPage = () => {
    const [itemData, setItemData] = useState<ItemDataType[]>([]);
    const [subtotalPrice, setSubtotalPrice] = useState<number>(0);

    const updateSubtotalPrice = () => {
        const newSubtotalPrice = itemData.reduce((total, current) => {
            return total + current.price;
        }, 0);

        setSubtotalPrice(parseFloat(newSubtotalPrice.toFixed(2)));
    };

    useEffect(() => {
        const rawData = localStorage.getItem('items');

        if (rawData) {
            const data: ItemDataType[] = JSON.parse(rawData);

            const newSubtotalPrice = data.reduce((total, current) => {
                return total + current.price;
            }, 0);

            setItemData(data);
            setSubtotalPrice(parseFloat(newSubtotalPrice.toFixed(2)));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Storize - Cart</title>
            </Head>

            <div className="container min-vh-100 py-5">
                <div className="row mt-lg-5 pt-5 d-flex align-items-center text-black">
                    {itemData.length === 0 ? (
                        <>
                            <div className="col-lg-6 col-12">
                                <div className="w-75 d-block m-auto">
                                    <Image src="/img/motorcycle.png" alt="Motorcycle" width="100%" height="100%" layout="responsive" priority />
                                </div>
                            </div>
                            <div className="col-lg-6 col-12 my-5 text-lg-start text-center">
                                <h1 className="status"><FaShoppingCart /> <FaFrown /></h1>
                                <h5>Looks like your cart is empty</h5>
                                <Link href="/products">
                                    <a className="btn btn-gold mt-3"><FaArrowRight /> Start Shopping</a>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="col-lg-8 col-12 text-center pe-lg-5">
                                <div className="row my-3">
                                    <div className="col-md-2 col-6">
                                        <h6>IMAGE</h6>
                                    </div>
                                    <div className="col-6">
                                        <h6>TITLE</h6>
                                    </div>
                                    <div className="col-md-2 col-6">
                                        <h6>QTY</h6>
                                    </div>
                                    <div className="col-md-2 col-6">
                                        <h6>PRICE</h6>
                                    </div>
                                </div>
                                <hr />

                                <CartItemContext.Provider value={{itemData, setItemData, updateSubtotalPrice}}>
                                    {itemData.map((item, i) => {
                                        return (
                                            <CartItem key={item.id} item={item} i={i} />
                                        );
                                    })}
                                </CartItemContext.Provider>
                            </div>
                            <div className="col-lg-4 col-12 mb-auto">
                                <div className="row bg-beige text-center text-white rounded">
                                    <div className="col p-4">
                                        <h6>Subtotal Price</h6>
                                        <hr />
                                        <h1 className="mb-3">${subtotalPrice}</h1>
                                        <Link href="/checkout">
                                            <a className="btn btn-gold w-100">Checkout</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export { CartItemContext };
export default Cart;