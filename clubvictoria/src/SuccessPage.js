import React from "react";
import "./SuccessPage.css"; 

const SuccessPage = () => {
    return (
        <div className="success-container">
            <div className="success-card">
                <h1 className="success-title">Mulțumim!</h1>
                <p className="success-message">
                    Formularul a fost trimis cu succes. Vom procesa datele tale cât mai curând posibil.
                </p>
                <div className="checkmark">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24">
                        <path
                            fill="none"
                            stroke="#4caf50"
                            strokeWidth="2"
                            d="M5 12l5 5L20 7"
                        />
                    </svg>
                </div>
                <p className="thank-you-note">Îți mulțumim pentru încredere!</p>
                <a href="/clubvictoria" className="back-home-btn">Înapoi la Acasă</a>
            </div>
        </div>
    );
};

export default SuccessPage;
