interface ShippingFeeProps {
    feeIndex: number;
    setFeeIndex: React.Dispatch<React.SetStateAction<number>>;
}

const ShippingFee: React.FC<ShippingFeeProps> = ({ feeIndex, setFeeIndex }) => {
    return (
        <>
            <h3>Shipping Fee</h3>
            <hr />
            <div className="row">
                <div className="col-4">
                    <button className={`btn btn-${feeIndex === 0 ? 'light' : 'gold'} w-100`} onClick={() => setFeeIndex(0)}>Free<br />$0</button>
                </div>
                <div className="col-4">
                    <button className={`btn btn-${feeIndex === 1 ? 'light' : 'gold'} w-100`} onClick={() => setFeeIndex(1)}>Regular<br />$1</button>
                </div>
                <div className="col-4">
                    <button className={`btn btn-${feeIndex === 2 ? 'light' : 'gold'} w-100`} onClick={() => setFeeIndex(2)}>Flash<br />$5</button>
                </div>
            </div>
        </>
    );
};

export default ShippingFee;