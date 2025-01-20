import React, { useRef, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom"; 
import SuccessPage from './SuccessPage';
import './App.css'
const App = () => {
    const canvasRef = useRef(null);
    const [drawing, setDrawing] = useState(false);
    const navigate = useNavigate(); 

    const getCoordinates = (event) => {
        const rect = canvasRef.current.getBoundingClientRect();
        let x, y;
        if (event.type.startsWith("touch")) {
            x = event.touches[0].clientX - rect.left;
            y = event.touches[0].clientY - rect.top;
        } else {
            x = event.clientX - rect.left;
            y = event.clientY - rect.top;
        }
        return { x, y };
    };

    const startDrawing = (event) => {
        event.preventDefault();
        setDrawing(true);
        const ctx = canvasRef.current.getContext("2d");
        ctx.beginPath();
        const { x, y } = getCoordinates(event);
        ctx.moveTo(x, y);
    };

    const draw = (event) => {
        if (!drawing) return;
        event.preventDefault();
        const ctx = canvasRef.current.getContext("2d");
        const { x, y } = getCoordinates(event);
        ctx.lineTo(x, y);
        ctx.stroke();
    };

    const stopDrawing = (event) => {
        event.preventDefault();
        setDrawing(false);
    };

    const clearSignature = () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const getSignatureBase64 = () => {
        const canvas = canvasRef.current;
        const dataUrl = canvas.toDataURL("image/png");
        const base64String = dataUrl.split(",")[1];
        return base64String;
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

                // Redirecționează către pagina de mulțumire
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

    return (
        <div className="container">
            <h1>C.S. KARATE VIROMET Victoria</h1>
            <p>
                Completează formularul pentru redistribuirea a 3,5% din impozitul tău pe venit către clubul nostru.
            </p>
            <form onSubmit={handleSubmit}>
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
                <input type="text" id="bloc" name="bloc" placeholder="Introduceți blocul" required />

                <label htmlFor="scara">Scară</label>
                <input type="text" id="scara" name="scara" placeholder="Introduceți scara" required />

                <label htmlFor="etaj">Etaj</label>
                <input type="text" id="etaj" name="etaj" placeholder="Introduceți etajul" required />

                <label htmlFor="ap">Apartament</label>
                <input type="text" id="ap" name="ap" placeholder="Introduceți apartamentul" required />

                <label htmlFor="semnatura">Semnătura</label>
                <canvas
                    ref={canvasRef}
                    id="semnatura"
                    className="signature-box"
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                ></canvas>

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
            </form>
        </div>
    );
};

const AppWithRouter = () => (
    <Router>
        <Routes>
            <Route path="/virometvictoria" element={<App />} />
            <Route path="/success" element={<SuccessPage />} />
        </Routes>
    </Router>
);

export default AppWithRouter;
