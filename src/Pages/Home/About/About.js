import React from 'react';
import parson from '../../../assets/images/about_us/person.jpg'
import parts from '../../../assets/images/about_us/parts.jpg'

const About = () => {
    return (
        <div className="hero my-20">
            <div className="hero-content flex-col lg:flex-row">
                <div className='relative w-1/2'>
                    <img src={parson} alt='' className=" w-4/5 h-full rounded-lg shadow-2xl" />
                    <img src={parts} alt='' className="absolute w-3/5 right-5 top-1/2 border-8 rounded-lg shadow-2xl" />
                </div>
                <div className='w-1/2'>
                    <p className='font-bold text-orange-700 '>About</p>
                    <h1 className="my-5 text-5xl font-bold">
                        We are qualifide <br />
                        & of experience <br />
                        in this filed
                    </h1>
                    <p className="py-6">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <p className='py-6'>the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. </p>
                    <button className="btn btn-info text-bold text-white">Get More Info</button>
                </div>
            </div>
        </div>
    );
};

export default About;