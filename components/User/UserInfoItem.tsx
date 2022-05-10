interface UserInfoItemProps {
    icon: React.ReactElement;
    title: string;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ icon, title }) => {
    return (
        <>
            <div>
                <h6 className="mb-1 text-gold">{icon} {title}</h6>
                <h6 className="card-title">-</h6>
            </div>
            <hr />
        </>
    );
};

export default UserInfoItem;