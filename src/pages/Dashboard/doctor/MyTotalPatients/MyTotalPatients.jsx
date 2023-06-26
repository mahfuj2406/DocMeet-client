import React from 'react';
import useAuth from '../../../../hooks/useAuth';

const MyTotalPatients = () => {
    const {user} = useAuth();
    return (
        <div>
            <h1>Total Patients : {'51'}</h1>
        </div>
    );
};

export default MyTotalPatients;