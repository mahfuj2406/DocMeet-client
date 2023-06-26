import { Link } from "react-router-dom";


const Footer = () => {
    return (
        <div className=" border">
            <footer className="container  mx-auto footer p-10 md:py-10 md:px-0 text-base-content">
                <div>
                <div className="flex">
                <h1 className="normal-case font-bold p-2 text-lg md:text-3xl text-transparent bg-clip-text bg-gradient-to-r from-green-700 via-slate-600 to-blue-600 hover:cursor-pointer"> <Link to={'/'}>DocMeet  </Link> </h1><img className="md:h-[50px] h-[40px]" src='https://i.ibb.co/Y4SjLBF/Firefly-Blue-stethoscope-logo-transparent-background-23049-removebg-preview.png' alt="" />
                </div>
                    <p>DocMeet is the largest online learning Platform.<br />Providing services since 2001</p>
                </div>
                <div>
                    <span className="footer-title">Quick Links</span>
                    <a className="link link-hover">All Classes</a>
                    <a className="link link-hover">All Instructors</a>
                </div>
                <div>
                    <span className="footer-title">Find Us on</span>
                    <a className="link link-hover"><i className="fa-brands fa-facebook"></i> facebook</a>
                    <a className="link link-hover"><i className="fa-brands fa-twitter"></i> Twitter</a>
                    <a className="link link-hover"><i className="fa-brands fa-instagram"></i> Instagram</a>
                    <a className="link link-hover"><i className="fa-brands fa-youtube"></i> YouTube</a>
                </div>
                <div>
                    <span className="footer-title">Contact Us</span>
                    <a className="link link-hover"><i className="fa-solid fa-house"></i> DIU-hall,Ashulia,Savar,Dhaka-1216</a>
                    <a className="link link-hover"><i className="fa-solid fa-envelope"></i> example@email.com</a>
                    <a className="link link-hover"><i className="fa-solid fa-phone"></i> +880 16xxxxxxxxx</a>
                </div>

            </footer>
            <div className="bg-blue-500 h-[50px] flex items-center justify-center">
                <p className="text-center">Copyright © 2023 - All right reserved by DocMeet</p>
            </div>
        </div>
    );
};

export default Footer;