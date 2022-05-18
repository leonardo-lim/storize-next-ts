import Image from 'next/image';
import styled from 'styled-components';

const ProductImage = styled.div`
    width: 100%;
    height: 120px;
    overflow: hidden;
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
    quantity: number;
    unitPrice: number;
    quantityError: boolean;
}

interface CheckoutItemProps {
    item: ProductType;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({ item }) => {
    return (
        <>
            <div className="row align-items-center">
                <div className="col-md-2 col-6">
                    <ProductImage>
                        <Image src={item.image} alt={item.title} width="100%" height="100%" layout="responsive" priority />
                    </ProductImage>
                </div>
                <div className="col-6">
                    <h6 className="px-2">{item.title}</h6>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3 ">
                    <h6>{item.quantity}</h6>
                </div>
                <div className="col-md-2 col-6 mt-md-0 mt-3 ">
                    <h6>${item.price}</h6>
                </div>
            </div>
            <hr />
        </>
    );
};

export default CheckoutItem;