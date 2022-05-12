import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';
import axios from 'axios';
import FetchLoading from '../../components/Widget/FetchLoading';
import ProductItem from '../../components/Product/ProductItem';

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
}

const Product: NextPage = () => {
    const address = 'https://fakestoreapi.com/products';

    const fetcher = async (url: string) => {
        const { data } = await axios.get(url);
        return data;
    };

    const options = {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    };

    const { data: items } = useSWR<ProductType[]>(address, fetcher, options);

    return (
        <>
            <Head>
                <title>Storize - Product</title>
            </Head>

            <div className="container min-vh-100 py-5">
                {!items ? (
                    <FetchLoading />
                ) : (
                    <div className="row mt-lg-5 pt-5 d-flex justify-content-center text-black">
                        {items.map((item) => {
                            return (
                                <div key={item.id} className="col-lg-4 col-md-6 col-12 p-0">
                                    <ProductItem item={item} />
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Product;