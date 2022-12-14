import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const Checkout = () => {
    const { _id, title, price } = useLoaderData();
    const { user } = useContext(AuthContext);

    const handlePlaceOrder = event => {
        event.preventDefault();
        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`;
        const email = user?.email || 'unregistered';
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            services: _id,
            servicesName: title,
            price,
            customer: name,
            email,
            phone,
            message
        }

        fetch('https://genius-car-server-coral.vercel.app/orders', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(order)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('oder successefully');
                    form.reset();

                }
            })
            .catch(err => console.error(err));

    }

    return (
        <div>
            <form onSubmit={handlePlaceOrder}>
                <h2 className="text-4xl">{title}</h2>
                <h3 className='text-3xl'>Price: {price}</h3>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
                    <input name="firstName" type="text" placeholder="First Name" className="input input-bordered w-full " />
                    <input name="lastName" type="text" placeholder="Last Name" className="input input-bordered w-full " />
                    <input name="phone" type="text" placeholder="Your Phone" className="input input-bordered w-full " />
                    <input name="email" type="text" placeholder="Your Email" defaultValue={user?.email} className="input input-bordered w-full " readOnly />
                </div>
                <textarea name="message" className="textarea textarea-bordered w-full h-24" placeholder="Your Message"></textarea>
                <input className='btn' type="submit" value="Please Oder now" />
            </form>
        </div>
    );
};

export default Checkout;