import type { CartProductType } from '../../types/product-type';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa';
import { CartItemContext } from '../../pages/cart';
import { AmountContext } from '../Layout/Layout';

const ProductImage = styled.div`
    width: 100%;
    height: 120px;
    overflow: hidden;
`;

const QuantityInput = styled.input`
    width: 45px;
    height: 30px;
    border: none;
    outline: none;
`;

interface CartItemProps {
    item: CartProductType;
    index: number;
}

const CartItem: React.FC<CartItemProps> = ({ item, index }) => {
    const { itemData, setItemData, updateSubtotalPrice } = useContext(CartItemContext)!;
    const { setAmount } = useContext(AmountContext)!;

    const decreaseQuantity = (idx: number) => {
        if (item.quantity > 1) {
            const updatedItemData = [...itemData];
            const currentItem = updatedItemData[idx];

            currentItem.quantity--;
            const price = currentItem.unitPrice * currentItem.quantity;

            currentItem.price = parseFloat(price.toFixed(2));
            currentItem.isQuantityError = false;

            setItemData(updatedItemData);
        }
    };

    const updateQuantity = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
        const quantity = parseInt(e.target.value);
        const updatedItemData = [...itemData];

        if (isNaN(quantity)) {
            updatedItemData.splice(idx, 1);
            setItemData(updatedItemData);
            setAmount(itemData.length - 1);

            localStorage.setItem('items', JSON.stringify(updatedItemData));
        } else if (quantity >= 1 && quantity <= itemData[idx].rating.count) {
            const currentItem = updatedItemData[idx];

            currentItem.quantity = quantity;
            const price = currentItem.unitPrice * currentItem.quantity;

            currentItem.price = parseFloat(price.toFixed(2));
            currentItem.isQuantityError = false;

            setItemData(updatedItemData);
        } else if (quantity > itemData[idx].rating.count) {
            updatedItemData[idx].isQuantityError = true;
            setItemData(updatedItemData);
        }
    };

    const increaseQuantity = (idx: number) => {
        if (itemData[idx].quantity < itemData[idx].rating.count) {
            const updatedItemData = [...itemData];
            const currentItem = updatedItemData[idx];

            currentItem.quantity++;
            const price = currentItem.unitPrice * currentItem.quantity;

            currentItem.price = parseFloat(price.toFixed(2));
            currentItem.isQuantityError = false;

            setItemData(updatedItemData);
        }
    };

    const removeItem = (idx: number) => {
        const updatedItemData = [...itemData];

        updatedItemData.splice(idx, 1);
        setItemData(updatedItemData);
        setAmount(itemData.length - 1);

        localStorage.setItem('items', JSON.stringify(updatedItemData));
    };

    useEffect(() => {
        localStorage.setItem('items', JSON.stringify(itemData));
        updateSubtotalPrice();
    }, [itemData, updateSubtotalPrice]);

    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-2 col-6">
                    <ProductImage>
                        <Link href={`/products/details/${item.id}`} passHref>
                            <a><Image src={item.image} alt={item.title} width="100%" height="100%" layout="responsive" priority /></a>
                        </Link>
                    </ProductImage>
                </div>
                <div className="col-6">
                    <h6 className="px-2">{item.title}</h6>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3 bg-beige text-center rounded">
                    <button className="btn text-white p-0" onClick={() => decreaseQuantity(index)}><FaMinus /></button>
                    <QuantityInput type="text" className="bg-transparent text-center text-white mx-1 fs-5" value={item.quantity} onChange={(e) => updateQuantity(e, index)} />
                    <button className="btn text-white p-0" onClick={() => increaseQuantity(index)}><FaPlus /></button>
                    <br />
                    <button className="btn text-white" title="Remove" onClick={() => removeItem(index)}><FaTrash /></button>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3">
                    <h6>${item.price}</h6>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {item.isQuantityError && <p className="alert alert-warning p-2">Max purchased item is {item.rating.count}</p>}
                </div>
            </div>
            <hr />
        </>
    );
};

export default CartItem;