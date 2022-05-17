import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import styled from 'styled-components';
import { FaBoxes, FaDollarSign, FaMinus, FaPlus, FaShoppingCart, FaStar } from 'react-icons/fa';
import { AmountContext } from '../../../components/Layout/Layout';
import FetchLoading from '../../../components/Widget/FetchLoading';

const ProductImage = styled.img`
    @media (min-width: 992px) {
        width: 100% !important;
    }
`;

const Quantity = styled.input`
    width: 45px;
    height: 30px;
    border: none;
    outline: none;
`;

interface ProductType {
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
    quantity?: number;
    unitPrice?: number;
    quantityError?: boolean;
}

const ProductDetails: NextPage = () => {
    const [rating, setRating] = useState<number>(0);
    const [stock, setStock] = useState<number>(0);
    const [unitPrice, setUnitPrice] = useState<number>(0);
    const [price, setPrice] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [quantityError, setQuantityError] = useState<boolean>(false);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);
    let itemData;

    const { setAmount } = useContext(AmountContext)!;

    const router = useRouter();
    const { id } = router.query;

    const address = `https://fakestoreapi.com/products/${id}`;

    const fetcher = async (url: string) => {
        const { data } = await axios.get(url);
        return data;
    };

    const options = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    };

    const { data: item } = useSWR<ProductType>(address, fetcher, options);

    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
            setPrice(parseFloat((unitPrice * (quantity - 1)).toFixed(2)));
            setQuantityError(false);
            setSuccessMessage(false);
        }
    };

    const updateQuantity: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const newQuantity = parseInt(e.target.value);

        if (isNaN(newQuantity)) {
            setQuantity(0);
            setPrice(0);
            setQuantityError(false);
        } else if (newQuantity >= 1 && newQuantity <= stock) {
            setQuantity(newQuantity);
            setPrice(parseFloat((unitPrice * newQuantity).toFixed(2)));
            setQuantityError(false);
        } else if (newQuantity > stock) {
            setQuantityError(true);
        }

        setSuccessMessage(false);
    };

    const increaseQuantity = () => {
        if (quantity < stock) {
            setQuantity(quantity + 1);
            setPrice(parseFloat((unitPrice * (quantity + 1)).toFixed(2)));
            setQuantityError(false);
            setSuccessMessage(false);
        }
    };

    const addToCart = () => {
        if (!item) {
            return;
        }

        if (quantity > 0) {
            const rawData = localStorage.getItem('items');

            if (!rawData) {
                itemData = [];
            } else {
                itemData = JSON.parse(rawData);
            }

            let currentQuantity, exist = false;

            for (const i of itemData) {
                if (i.id === item.id) {
                    i.quantity += quantity;
                    i.price = parseFloat((i.unitPrice * i.quantity).toFixed(2));
                    currentQuantity = i.quantity;
                    exist = true;
                    break;
                }
            }

            if (exist) {
                if (currentQuantity > stock) {
                    setQuantityError(true);
                    setSuccessMessage(false);
                } else {
                    localStorage.setItem('items', JSON.stringify(itemData));
                    setQuantity(1);
                    setPrice(unitPrice);
                    setQuantityError(false);
                    setSuccessMessage(true);
                }
            } else {
                item.quantity = quantity;
                item.unitPrice = parseFloat(item.price.toFixed(2));

                const newPrice = item.unitPrice * item.quantity;
                item.price = parseFloat(newPrice.toFixed(2));
                item.quantityError = false;

                itemData.push(item);
                localStorage.setItem('items', JSON.stringify(itemData));
                item.price = item.unitPrice;

                setQuantity(1);
                setPrice(unitPrice);
                setAmount(itemData.length);
                setQuantityError(false);
                setSuccessMessage(true);
            }
        }
    };

    useEffect(() => {
        if (!item) {
            return;
        }

        setRating(item.rating.rate);
        setStock(item.rating.count);
        setUnitPrice(parseFloat(item.price.toFixed(2)));
        setPrice(parseFloat(item.price.toFixed(2)));
    }, [item]);

    return (
        <>
            <Head>
                <title>Storize - Product Details</title>
            </Head>

            <div className="container pt-lg-0 pt-5">
                <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                    {!item ? (
                        <FetchLoading />
                    ) : (
                        <>
                            <div className="col-lg-3 col-12 mb-lg-0 mb-5">
                                <ProductImage src={item.image} className="w-50 d-block ms-lg-auto m-auto" alt={item.title} />
                            </div>
                            <div className="col-lg-6 col-12 mb-lg-0 mb-5 px-5">
                                <h2 className="mb-3 text-lg-start text-center">{item.title}</h2>
                                <hr />
                                <h6 className="mb-3 text-lg-start text-center">{item.description}</h6>
                                <div className="row">
                                    <div className="col-4 py-2 text-center">
                                        <h6 className="text-gold"><FaDollarSign /> Price</h6>
                                        <h5>{item.price}</h5>
                                    </div>
                                    <div className="col-4 py-2 text-center border border-top-0 border-bottom-0">
                                        <h6 className="text-gold"><FaStar /> Rating</h6>
                                        <h5>{rating}</h5>
                                    </div>
                                    <div className="col-4 py-2 text-center">
                                        <h6 className="text-gold"><FaBoxes /> Stock</h6>
                                        <h5>{stock}</h5>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-12 mb-lg-0 mb-5 p-3 bg-beige text-white text-center rounded shadow-sm">
                                <h1 className="mb-3"><FaShoppingCart /></h1>

                                {quantityError && <p className="alert alert-warning p-2">Max purchased item is {stock}</p>}
                                {successMessage && <p className="alert alert-success p-2">Added to cart</p>}

                                <div className="row mb-2">
                                    <div className="col-5 text-start mt-1">
                                        <h5>Quantity</h5>
                                    </div>
                                    <div className="col-7 text-end">
                                        <button className="btn text-white p-0" onClick={decreaseQuantity}><FaMinus /></button>
                                        <Quantity type="text" className="bg-transparent text-center text-white mx-1 fs-5" value={quantity} onChange={updateQuantity} />
                                        <button className="btn text-white p-0" onClick={increaseQuantity}><FaPlus /></button>
                                    </div>
                                </div>
                                <div className="row mb-3">
                                    <div className="col-6 text-start">
                                        <h5>Total price</h5>
                                    </div>
                                    <div className="col-6 text-end">
                                        <h5>${price}</h5>
                                    </div>
                                </div>
                                <button className="btn btn-gold w-100" onClick={addToCart}>Add to Cart</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default ProductDetails;