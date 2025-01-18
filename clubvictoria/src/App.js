import React, { useRef, useState } from "react";
import "./App.css";

const App = () => {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);

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

  return (
    <div className="container">
      <h1>Club Sportiv Karate Victoria</h1>
      <p>Completează formularul pentru redistribuirea unui procent din impozit către clubul nostru.</p>
      <form>
        <label htmlFor="nume">Nume</label>
        <input type="text" id="nume" name="nume" placeholder="Introduceți numele" required />

        <label htmlFor="prenume">Prenume</label>
        <input type="text" id="prenume" name="prenume" placeholder="Introduceți prenumele" required />

        <label htmlFor="telefon">Număr de telefon</label>
        <input type="tel" id="telefon" name="telefon" placeholder="07xxxxxxxx" required />

        <label htmlFor="adresa">Adresă</label>
        <input type="text" id="adresa" name="adresa" placeholder="Introduceți adresa completă" required />

        <label htmlFor="cnp">CNP</label>
        <input type="number" id="cnp" name="cnp" placeholder="Introduceți CNP-ul" required />

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
            Sunt de acord cu colectarea și procesarea datelor mele conform legilor GDPR în vigoare în România (2025).
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

export default App;
