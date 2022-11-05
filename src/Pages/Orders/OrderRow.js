import React, { useEffect, useState } from 'react';

const OrderRow = ({ order, handleDelete, handleStatusUpdate }) => {
    const { _id, servicesName, phone, customer, price, services, status } = order;
    const [orderService, setOrderService] = useState({})
    console.log(order);

    useEffect(() => {
        fetch(`https://genius-car-server-coral.vercel.app/services/${services}`)
            .then(res => res.json())
            .then(data => setOrderService(data))

    }, [services])


    return (

        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className='btn btn-ghost'>X</button>
                </label>
            </th>
            <td>
                <div className="flex items-center space-x-3">
                    <div className="avatar">
                        <div className="rounded w-12 h-12">
                            {
                                orderService?.img &&
                                <img src={orderService?.img} alt="Avatar Tailwind CSS Component" />
                            }
                        </div>
                    </div>
                    <div>
                        <div className="font-bold">{customer}</div>
                        <div className="text-sm opacity-50">{phone}</div>
                    </div>
                </div>
            </td>
            <td>
                {servicesName}
                <br />
                <span className="badge badge-ghost badge-sm">${price}</span>
            </td>
            <td>Purple</td>
            <th>
                <button onClick={() => handleStatusUpdate(_id)} className="btn btn-ghost btn-xs">{status ? status : 'pending'}</button>
            </th>
        </tr>

    );
};

export default OrderRow;