import { Link, useParams } from "react-router-dom";
// import useAuth from "../../../hooks/useAuth";


const PaymentSuccess = () => {
    // const {user} = useAuth();
    const {tranId} = useParams();
    return (
        <div className="w-full my-20 py-20">
            <div className="container mx-auto flex flex-col items-center">
                <img src={'https://i.ibb.co/Q9kb1mX/payment-ok.gif'} className="rounded-full border-4 border" />
                <div className="border rounded-lg border-2 p-10 mt-10">
                {/* <h1 className="text-2xl"><span className="text-lg">Dear</span> {user.displayName} </h1> */}
                <p className="text-success">You payment has been completed successfully!</p>
                <p className="">Transaction ID is : <span className="font-bold"> {tranId} </span></p>
                </div>
                <Link to={'/dashboard'}><button className="btn bg-blue-300 hover:bg-blue-400 hover:text-white mt-2">Go to dashboard</button></Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;