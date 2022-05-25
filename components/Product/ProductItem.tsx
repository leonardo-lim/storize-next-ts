import type { ProductType } from '../../types/product-type';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import { FaEye } from 'react-icons/fa';

const Card = styled.div`
    height: 500px;
    background: rgba(255, 255, 255, .25);
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, .25);
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, .18);
    overflow: auto;
`;

const CardImage = styled.div`
    width: 100%;
    height: 350px;
    overflow: hidden;
`;

interface ProductItemProps {
    item: ProductType;
}

const ProductItem: React.FC<ProductItemProps> = ({ item }) => {
    return (
        <Card className="card m-2 p-2">
            <CardImage>
                <Image src={item.image} className="card-img-top m-auto" alt={item.title} width="100%" height="100%" layout="responsive" priority />
            </CardImage>
            <div className="card-body text-center">
                <h6 className="card-title">{item.title}</h6>
                <h5 className="card-text mb-3">${item.price}</h5>
                <Link href={`/products/details/${item.id}`}>
                    <a className="btn btn-gold w-100"><FaEye /> See Details</a>
                </Link>
            </div>
        </Card>
    );
};

export default ProductItem;