import React, { useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import SuccessPage from './SuccessPage';
import SignatureCanvas from 'react-signature-canvas';
import poza from './poza.jpg';
import Carusel from './Carusel';
import './App.css';

const App = () => {

    useEffect(() => {
        document.title = "Formular Viromet Victoria";
    }, []);

    const sigCanvasRef = useRef(null);
    const navigate = useNavigate();

    const clearSignature = () => {
        sigCanvasRef.current.clear();
    };

    const getSignatureBase64 = () => {
        return sigCanvasRef.current.getTrimmedCanvas().toDataURL("image/png").split(",")[1];
    };

    const handleRedirect = () => {
        navigate('/dontest');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const persoana = {
            nume: e.target.nume.value,
            prenume: e.target.prenume.value,
            telefon: e.target.telefon.value,
            cnp: e.target.cnp.value,
            email: e.target.email.value,
            strada: e.target.strada.value,
            numar: e.target.numar.value,
            bloc: e.target.bloc.value,
            scara: e.target.scara.value,
            etaj: e.target.etaj.value,
            ap: e.target.ap.value,
            codpostal: e.target.codpostal.value,
            localitate: e.target.localitate.value,
            judet: e.target.judet.value,
            initialatata: e.target.initialatata.value,
            semnatura: getSignatureBase64(),
            ani: e.target.ani.value,
        };

        const data = [persoana];

        try {
            const response = await fetch("https://dbmicro.onrender.com/api/persoane", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log("Data sent successfully:", result);

                navigate('/success');
            } else {
                console.error("Error response:", response.status, response.statusText);
                alert("A apărut o eroare la trimiterea datelor.");
            }
        } catch (error) {
            console.error("Error sending data:", error);
            alert("A apărut o eroare la trimiterea datelor.");
        }
    };


    const handlesubmit2 = async (e) => {
        navigate('/dontest');
    }

    return (
        <div className="container">
            <h1>C.S. KARATE VIROMET Victoria</h1>
            <p className="intro-text">
                <strong>Solicitare pentru redirecționarea a 3,5% din impozitul pe venit</strong>
                <br /><br />
                Stimată doamnă/Stimate domn,<br /><br />
                Clubul Sportiv <strong>C.S. KARATE VIROMET Victoria</strong> vă invită să sprijiniți activitatea noastră prin redirecționarea a 3,5% din impozitul pe venit către clubul nostru. Această contribuție nu implică niciun cost suplimentar pentru dumneavoastră, dar are un impact semnificativ asupra susținerii tinerilor sportivi și dezvoltării activităților noastre.<br /><br />
                Completați formularul atașat și contribuiți alături de noi la promovarea sportului și a valorilor pe care le inspirăm generațiilor viitoare.<br /><br />
                Vă mulțumim pentru sprijinul acordat!<br /><br />
                Cu stimă, Conducerea C.S. KARATE VIROMET Victoria
            </p>
            <div className="image-container">
                <img src={poza} alt="Logo C.S. KARATE VIROMET Victoria" className="logo-image" />
            </div>
            <form onSubmit={handleSubmit}>
                <label htmlFor="ani">Perioada de susținere</label>
                <select id="ani" name="ani" required>
                    <option value="1">1 an</option>
                    <option value="2">2 ani</option>
                </select>

                <label htmlFor="nume">Nume</label>
                <input type="text" id="nume" name="nume" placeholder="Introduceți numele" required />

                <label htmlFor="prenume">Prenume</label>
                <input type="text" id="prenume" name="prenume" placeholder="Introduceți prenumele" required />

                <label htmlFor="initialatata">Inițiala tatălui</label>
                <input type="text" id="initialatata" name="initialatata" placeholder="Introduceți inițiala tatălui" required />

                <label htmlFor="cnp">CNP</label>
                <input type="text" id="cnp" name="cnp" placeholder="Introduceți CNP-ul" required />

                <label htmlFor="email">Email</label>
                <input type="text" id="email" name="email" placeholder="Introduceți adresa de email" required />

                <label htmlFor="telefon">Telefon</label>
                <input type="tel" id="telefon" name="telefon" placeholder="07xxxxxxxx" required />

                <label htmlFor="judet">Județ</label>
                <input type="text" id="judet" name="judet" placeholder="Introduceți județul" required />

                <label htmlFor="localitate">Localitate</label>
                <input type="text" id="localitate" name="localitate" placeholder="Introduceți localitatea" required />

                <label htmlFor="codpostal">Cod poștal</label>
                <input type="text" id="codpostal" name="codpostal" placeholder="Introduceți codul poștal" required />

                <label htmlFor="strada">Strada</label>
                <input type="text" id="strada" name="strada" placeholder="Introduceți strada" required />

                <label htmlFor="numar">Număr</label>
                <input type="text" id="numar" name="numar" placeholder="Introduceți numărul" required />

                <label htmlFor="bloc">Bloc</label>
                <input type="text" id="bloc" name="bloc" placeholder="Introduceți blocul" />

                <label htmlFor="scara">Scară</label>
                <input type="text" id="scara" name="scara" placeholder="Introduceți scara" />

                <label htmlFor="etaj">Etaj</label>
                <input type="text" id="etaj" name="etaj" placeholder="Introduceți etajul" />

                <label htmlFor="ap">Apartament</label>
                <input type="text" id="ap" name="ap" placeholder="Introduceți apartamentul" />

                <label htmlFor="semnatura">Semnătura</label>
                <SignatureCanvas
                    ref={sigCanvasRef}
                    penColor="black"
                    canvasProps={{ className: "signature-box" }}
                />

                <div className="gdpr-section">
                    <label>
                        <input type="checkbox" id="gdpr" name="gdpr" required />
                        Declar că sunt de acord cu colectarea și procesarea datelor mele personale, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR) și legislația în vigoare din România.
                    </label>
                </div>
                <div className="gdpr-section">
                    <label>
                        <input type="checkbox" id="gdpr-consent" name="gdpr-consent" required />
                        Declar că sunt de acord cu colectarea și procesarea datelor mele personale. Acestea vor fi stocate pentru cel mult 48 de ore, până la finalizarea procesării, după care vor fi șterse definitiv.
                    </label>
                </div>

                <button type="button" onClick={clearSignature}>
                    Șterge Semnătura
                </button>
                <button type="submit">Trimite</button>
                {/*<button type="button" onClick={handlesubmit2}></button> */}
            </form>
        </div>
    );
};

const AppWithRouter = () => (
    <Router basename="/clubvictoria">
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/dontest" element={<Carusel />} />

        </Routes>
    </Router>
);

export default AppWithRouter;
