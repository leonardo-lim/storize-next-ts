import type { CartProductType } from '../../types/product-type';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { AmountContext } from '../Layout/Layout';

interface OrderSummaryProps {
    feeIndex: number;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ feeIndex }) => {
    const [subtotalPrice, setSubtotalPrice] = useState(0);
    const [taxPrice, setTaxPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const { setAmount } = useContext(AmountContext)!;

    const completeOrder = () => {
        setAmount(0);
        localStorage.setItem('items', JSON.stringify([]));
    };

    useEffect(() => {
        const rawData = localStorage.getItem('items');

        if (rawData) {
            const data: CartProductType[] = JSON.parse(rawData);

            const newSubtotalPrice = data.reduce((total, current) => {
                return total + current.price;
            }, 0);

            const newTaxPrice = newSubtotalPrice / 10;
            let newShippingPrice;

            if (feeIndex === 0) {
                newShippingPrice = 0;
            } else if (feeIndex === 1) {
                newShippingPrice = 1;
            } else {
                newShippingPrice = 5;
            }

            const newTotalPrice = newSubtotalPrice + newTaxPrice + newShippingPrice;

            setSubtotalPrice(parseFloat(newSubtotalPrice.toFixed(2)));
            setTaxPrice(parseFloat(newTaxPrice.toFixed(2)));
            setShippingPrice(parseFloat(newShippingPrice.toFixed(2)));
            setTotalPrice(parseFloat(newTotalPrice.toFixed(2)));
        }
    }, [feeIndex]);

    return (
        <>
            <h3>Order Summary</h3>
            <hr />
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6>Subtotal price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6>${subtotalPrice}</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6>Tax price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6>${taxPrice}</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6>Shipping price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6>${shippingPrice}</h6>
                </div>
            </div>
            <div className="row mb-2">
                <div className="col-6 text-start">
                    <h6 className="fw-bold">Total price</h6>
                </div>
                <div className="col-6 text-end">
                    <h6 className="fw-bold">${totalPrice}</h6>
                </div>
            </div>
            <Link href="/completed">
                <a className="btn btn-gold w-100" onClick={completeOrder}>Complete Order</a>
            </Link>
        </>
    );
};

export default OrderSummary;