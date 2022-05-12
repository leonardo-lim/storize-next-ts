import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaSignInAlt } from 'react-icons/fa';
import { AmountContext } from './Layout';

const Nav = styled.nav`
    z-index: 1;

    .navbar-collapse {
        background-color: #fff;
        box-shadow: rgba(149, 157, 165, .2) 0 8px 24px;
    }

    @media (min-width: 975px) {
        .navbar-collapse {
            background-color: transparent;
            box-shadow: none;
        }
    }
`;

const Amount = styled.span`
    position: absolute;
    top: -10px;
    margin-left: 2px;
    padding: 0 5px;
`;

const Navbar: React.FC = () => {
    const { amount, setAmount } = useContext(AmountContext)!;
    const { asPath } = useRouter();

    useEffect(() => {
        const rawData = localStorage.getItem('items');
        let data;

        if (!rawData) {
            data = [];
        } else {
            data = JSON.parse(rawData);
        }

        setAmount(data.length);
    }, [setAmount]);

    return (
        <Nav className="navbar navbar-expand-lg navbar-light bg-transparent position-absolute w-100 mt-lg-5 mt-2 text-black">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand fs-1 text-gold">Storize</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mt-lg-0 mt-2 pb-lg-0 pb-3 rounded" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link href="/products">
                                <a className={`nav-link ${asPath.includes('/products') && 'active'} fs-5 mx-3`}>Product</a>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link href="/about">
                                <a className={`nav-link ${asPath === '/about' && 'active'} fs-5 mx-3`}>About</a>
                            </Link>
                        </li>
                    </ul>
                    <form className="d-flex ms-auto position-relative">
                        <Link href="/cart">
                            <a className="btn btn-beige ms-3" title="Cart">
                                <FaShoppingCart />
                                {amount > 0 && <Amount className="bg-danger rounded">{amount}</Amount>}
                            </a>
                        </Link>
                        <Link href="/login">
                            <a className="btn btn-gold ms-3"><FaSignInAlt /> Login</a>
                        </Link>
                    </form>
                </div>
            </div>
        </Nav>
    );
};

export default Navbar;