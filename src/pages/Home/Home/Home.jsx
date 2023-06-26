import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import PopularDoctors from "../PopularDoctors/PopularDoctors";
import FindDoctor from "../FindDoctor/FindDoctor";
import AvailableNow from "../AvailableNow/AvailableNow";
const Home = () => {
    return (
        <div className="container mx-auto mt-10">
            <Helmet>
                <title>DocMeet || Home</title>
            </Helmet>
            <Banner></Banner>
            <FindDoctor></FindDoctor>
            <PopularDoctors></PopularDoctors>
            <AvailableNow></AvailableNow>
        </div>
    );
};

export default Home;