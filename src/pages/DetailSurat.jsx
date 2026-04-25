import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";   
import parse from "html-react-parser";

const DetailSurat = () => {
    const { id } = useParams();
    // Ubah inisialisasi awal menjadi null karena data yang diterima adalah object
    const [surat, setSurat] = useState(null); 
    const [loading, setLoading] = useState(true);

    const getDataFromAPI = () => {
        fetch(`https://equran.id/api/v2/surat/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setSurat(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log("Error fetching data:", error);
                setLoading(false);
            });
    };

    useEffect(() => {
        // Tidak perlu mempassing id di sini karena getDataFromAPI sudah mengambil id dari scope luar
        getDataFromAPI(); 
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }
    if (!surat) {
        return <p>Surat tidak ditemukan.</p>;
    }

    return (
        <div>
            <div className="mb-4">
                <h2>
                    {surat.namaLatin} ({surat.nama})
                </h2>
                <p>Jumlah Ayat: {surat.jumlahAyat}</p>
                <p>Arti: {surat.arti}</p>
                {/* Gunakan 'parse' di sini agar tag HTML dari API dirender menjadi format teks yang rapi */}
                <p>Deskripsi: {parse(surat.deskripsi)}</p>
            </div>
            <div>
                <ul className="list-group">
                    {/* surat.ayat akan aman di-map karena kita sudah memastikan surat tidak null di atas */}
                    {surat.ayat.map((ayat) => (
                        <li 
                        className="list-group-item d-flex justify-content-between align-items-center arabic-text" 
                        key={ayat.nomorAyat}
                        >
                            {ayat.teksArab}
                            <span className="badge text-bg-primary rounded-pill">
                                {ayat.nomorAyat}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default DetailSurat;