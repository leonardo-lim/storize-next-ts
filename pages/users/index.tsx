import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { FaCity, FaClock, FaEnvelope, FaGlobe, FaHome, FaMapMarkerAlt, FaPencilAlt, FaPhoneAlt, FaTag, FaUser } from 'react-icons/fa';
import UserInfoItem from '../../components/User/UserInfoItem';

const User: NextPage = () => {
    return (
        <>
            <Head>
                <title>Storize - User Profile</title>
            </Head>

            <div className="container">
                <div className="row min-vh-100 pt-5 d-flex align-items-center text-black">
                    <div className="col-lg-4 col-12">
                        <Image src="/img/scrolling.png" alt="Scrolling" width="100%" height="100%" layout="responsive" priority />
                    </div>
                    <div className="col-lg-8 col-12">
                        <div className="card bg-transparent w-100 border-0 m-auto float-lg-start">
                            <div className="card-body text-lg-start text-center">
                                <div className="row">
                                    <div className="col">
                                        <h1 className="mb-3">My Profile</h1>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-lg-6 col-12">
                                        <UserInfoItem icon={<FaTag />} title="Name" />
                                        <UserInfoItem icon={<FaUser />} title="Username" />
                                        <UserInfoItem icon={<FaEnvelope />} title="Email" />
                                        <UserInfoItem icon={<FaPhoneAlt />} title="Phone" />
                                        <UserInfoItem icon={<FaClock />} title="Joined From" />
                                    </div>
                                    <div className="col-lg-6 col-12">
                                        <UserInfoItem icon={<FaMapMarkerAlt />} title="Address" />
                                        <UserInfoItem icon={<FaCity />} title="City" />
                                        <UserInfoItem icon={<FaGlobe />} title="Country" />
                                        <UserInfoItem icon={<FaHome />} title="Zip Code" />
                                        <Link href="/users/edit">
                                            <a className="btn btn-gold w-100 mt-2"><FaPencilAlt /> Edit</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;