import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [surat, setSurat] = useState([]);

    const getDataFromAPI = () => {
        fetch("https://equran.id/api/v2/surat")
            .then((res) => res.json())
            .then((data) => {
                setSurat(data.data);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
            });
    };

    useEffect(() => {
        getDataFromAPI();
    }, []);

    return (
        <>
            <div 
                className="bg-dark text-white vh-100 p-3 overflow-auto"
                style={{ width: "250px" }}
            >
                <h5 className="text-center">Qur-an Web</h5>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/" className="nav-link text-white">
                            Dashboard
                        </Link>
                    </li>
                    <li className="nav-item">
                        <a
                            className="nav-link text-white" data-bs-toggle="collapse" href="#submenu1"
                            role="button" aria-expanded="false" aria-controls="submenu">
                            <i className="bi bi-folder"></i>
                            Surat
                        </a>
                        <div className="collapse show" id="submenu1"> 
                            <ul className="nav flex-column ms-3">
                                {surat.map((surah) => (
                                    <li className="nav-item" key={surah.nomor}>
                                        <Link to={`/surat/${surah.nomor}`} className="nav-link text-white">
                                            <i className="bi bi-flower3"></i> {surah.nomor}.{" "}
                                            {surah.namaLatin}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                    
                    {/* Jika nanti ingin menambahkan menu Settings, bisa ditaruh di sini */}
                    {/* <li className="nav-item">
                        <Link className="nav-link text-white">
                            <i className="bi bi-gear"></i> Settings
                        </Link>
                    </li> */}
                </ul>
            </div>
        </>
    );
};

export default Navbar;