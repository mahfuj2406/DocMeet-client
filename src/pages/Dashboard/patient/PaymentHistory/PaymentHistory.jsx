import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import { Helmet } from "react-helmet";
import SectionTitle from "../../../Shared/SectionTitle/SectionTitle";
import { FaEye } from "react-icons/fa";

const PaymentHistory = () => {
    const { user } = useAuth();

    const { data: payments = [], refetch } = useQuery(['payments'], async () => {
        const res = await fetch(`http://localhost:5000/patient/payments/${user.email}`)
        if (!res.ok) {
            throw new Error('Data fetch response was not ok !')
        }
        return res.json();
    })
    return (
        <div className='container mx-auto search-page py-10'>
            <Helmet>
                <title>DocMeet || payment history</title>
            </Helmet>
            <SectionTitle heading={"All payments"}></SectionTitle>
            <h1 className='bg-slate-300 inline-block px-3 py-1 rounded'>Total appointments : {payments.length}</h1>

            <div className="overflow-x-auto">
                <table className="table table-pin-rows table-pin-cols">
                    <thead>
                        <tr className='text-md md:text-xl text-center'>
                            <td>#</td>
                            <td>Payment Date and Time</td>
                            <td>Transaction Id</td>
                            <td>Description</td>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {
                            payments.map((payments, index) =>
                                <tr className="my-3 text-center text-2xl md:text-3xl"
                                    key={user._id}
                                >
                                    <th className="text-md md:text-lg"> {index + 1} </th>

                                    <td className="text-md md:text-lg">{payments.transactionId.split("-")[0][5]}{payments.transactionId.split("-")[0][6]}- {payments.transactionId.split("-")[0][3]}{payments.transactionId.split("-")[0][4]}-{payments.transactionId.split("-")[0][1]}{payments.transactionId.split("-")[0][2]}  & {'('} {payments.transactionId.split("-")[1][0]}{payments.transactionId.split("-")[1][1]}:{payments.transactionId.split("-")[1][2]}{payments.transactionId.split("-")[1][3]}  {')'}</td>

                                    <td className="text-md md:text-lg">{payments.transactionId} </td>

                                    <td className="text-md md:text-lg">{payments.doctorName} {'('} {payments.appointmentDate} - {payments.scheduledTime} {')'} </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;