import { useNavigate } from "react-router-dom";
import SectionTitle from "../../Shared/SectionTitle/SectionTitle";

const FindDoctor = () => {
    const navigate = useNavigate();
    const handleSearch = (event) =>{
        event.preventDefault();
        const form = event.target;
        const area = form.area.value;
        const speciality = form.speciality.value;

        navigate(`find-doctor/${area}/${speciality}`)
        


    }
    return (
        <div>
            <SectionTitle heading={"Find Your Doctor"}></SectionTitle>
            <div className="card w-full shadow-2xl">
                <form onSubmit={handleSearch}>
                <div className="card-body w-6/12 mx-auto md:flex-row justify-between items-stretch">
                    <div className="form-control md:w-2/6">
                        <select type="text" name="area" placeholder="email" className="input input-bordered" >
                            <option value="dhaka">Dhaka</option>
                            <option value="barisal">Barisal</option>
                            <option value="khulna">Khulna</option>
                            <option value="sylhet">Sylhet</option>
                            <option value="rajshahi">Rahshahi</option>
                        </select>
                    </div>
                    <div className="form-control md:w-2/6">
                        <select name="speciality" className="input input-bordered" >
                            <option value="cardiologist">Cardiologists</option>
                            <option value="dermatologist">Dermatologists</option>
                            <option value="neurologist">Neurologist</option>
                        </select>
                    </div>
                    <div className="form-control md:w-2/6">
                        <button type="submit" className="btn bg-blue-500 hover:bg-blue-700 hover:text-white">Search</button>
                    </div>
                </div>
                </form>
            </div>

        </div>
    );
};

export default FindDoctor;