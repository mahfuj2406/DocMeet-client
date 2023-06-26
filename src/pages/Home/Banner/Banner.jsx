

const Banner = () => {
    return (
        <div className="hero p-20 bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src="https://i.ibb.co/pJ2S1y2/doctor.png" className="max-w-sm rounded-lg shadow-2xl" />
                <div className="">
                    <h1 className="text-5xl font-bold">Our Service at your door step!</h1>
                    <p className="py-6">DocMeet is the largest online medical support service in Bangladesh. We care about our client.</p>
                    <button className="btn bg-blue-500 hover:bg-blue-700 hover:text-white">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;