import React, { useEffect, useState } from 'react';
import ServicesCard from './ServicesCard';

const Services = () => {

    const [services, setServices] = useState([]);
    // console.log(services);

    useEffect(() => {
        fetch('http://localhost:5000/services')
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])

    return (
        <div>
            <div className='text-center mb-4'>
                <p className='text-2xl font-bold text-orange-700'>Services</p>
                <h2 className="text-5xl font-bold">Our Services Area</h2>
                <p>the majority have suffered alteration in some form, by injected humour, <br /> or randomised words which don't look even slightly believable. </p>
            </div>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-12'>
                {
                    services.map(service => <ServicesCard
                        key={service._id}
                        service={service}

                    ></ServicesCard>)
                }
            </div>
        </div>
    );
};

export default Services;