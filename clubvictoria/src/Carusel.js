import React, { useEffect } from "react";
import "./Carusel.css";
import imagePart001 from "./assets/images/image_part_001.png";
import imagePart002 from "./assets/images/image_part_002.png";
import imagePart003 from "./assets/images/image_part_003.png";
import imagePart004 from "./assets/images/image_part_004.png";
import imagePart005 from "./assets/images/image_part_005.png";
import imagePart006 from "./assets/images/image_part_006.png";
import imagePart007 from "./assets/images/image_part_007.png";
import imagePart008 from "./assets/images/image_part_008.png";
import imagePart009 from "./assets/images/image_part_009.png";

const Carusel = () => {
    const donateLink = "https://donate.stripe.com/test_5kA9BbgLu2zv5eE145";

    // Funcția care va redirecționa utilizatorul
    const handleDonateClick = () => {
        window.open(donateLink, "_blank");
    };

    useEffect(() => {
        const container = document.querySelector(".container1");
        const containerCarrossel = container.querySelector(".container-carrossel");
        const carrossel = container.querySelector(".carrossel");
        const carrosselItems = carrossel.querySelectorAll(".carrossel-item");

        let isMouseDown = false;
        let currentMousePos = 0;
        let lastMousePos = 0;
        let lastMoveTo = 0;
        let moveTo = 0;

        const createCarrossel = () => {
            const carrosselProps = onResize();
            const length = carrosselItems.length;
            const degrees = 360 / length;
            const gap = 10;
            const tz = distanceZ(carrosselProps.w, length, gap);

            container.style.width = tz * 2 + gap * length + "px";

            carrosselItems.forEach((item, i) => {
                const degreesByItem = degrees * i + "deg";
                item.style.setProperty("--rotatey", degreesByItem);
                item.style.setProperty("--tz", tz + "px");
            });
        };

        const lerp = (a, b, n) => n * (a - b) + b;

        const distanceZ = (widthElement, length, gap) =>
            widthElement / 2 / Math.tan(Math.PI / length) + gap;

        const getPosX = (x) => {
            currentMousePos = x;
            moveTo = currentMousePos < lastMousePos ? moveTo - 2 : moveTo + 2;
            lastMousePos = currentMousePos;
        };

        const update = () => {
            lastMoveTo = lerp(moveTo, lastMoveTo, 0.01);
            carrossel.style.setProperty("--rotatey", lastMoveTo + "deg");
            requestAnimationFrame(update);
        };

        const onResize = () => {
            const boundingCarrossel = containerCarrossel.getBoundingClientRect();
            return {
                w: boundingCarrossel.width,
                h: boundingCarrossel.height,
            };
        };

        const initEvents = () => {
            carrossel.addEventListener("mousedown", () => {
                isMouseDown = true;
                carrossel.style.cursor = "grabbing";
            });
            carrossel.addEventListener("mouseup", () => {
                isMouseDown = false;
                carrossel.style.cursor = "grab";
            });
            container.addEventListener("mouseleave", () => (isMouseDown = false));

            carrossel.addEventListener("mousemove", (e) => isMouseDown && getPosX(e.clientX));
            carrossel.addEventListener("touchstart", () => {
                isMouseDown = true;
                carrossel.style.cursor = "grabbing";
            });
            carrossel.addEventListener("touchend", () => {
                isMouseDown = false;
                carrossel.style.cursor = "grab";
            });
            container.addEventListener("touchmove", (e) => isMouseDown && getPosX(e.touches[0].clientX));

            window.addEventListener("resize", createCarrossel);
            update();
            createCarrossel();
        };

        initEvents();
    }, []);

    return (
        <div className="conteudo__geral">
            <div className="container1">
                <div className="container-carrossel">
                    <div className="carrossel">
                        <div className="carrossel-item">
                            <div className="pret">5 RON</div>
                            <img className="img2" src={imagePart001} alt="10 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">10 RON</div>
                            <img className="img2" src={imagePart001} alt="9 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">20 RON</div>
                            <img className="img3" src={imagePart002} alt="8 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">50 RON</div>
                            <img className="img4" src={imagePart003} alt="7 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">100 RON</div>
                            <img className="img5" src={imagePart004} alt="6 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">5 RON <br /> LUNAR</div>
                            <img className="img6" src={imagePart005} alt="5 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">10 RON <br /> LUNAR</div>
                            <img className="img7" src={imagePart005} alt="4 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">20 RON <br /> LUNAR</div>
                            <img className="img8" src={imagePart006} alt="3 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">50 RON <br /> LUNAR</div>
                            <img className="img9" src={imagePart007} alt="2 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">100 RON <br /> LUNAR</div>
                            <img className="img10" src={imagePart008} alt="1 KYU" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                        <div className="carrossel-item">
                            <div className="pret">CUSTOM</div>
                            <img className="img1" src={imagePart009} alt="DAN" />
                            <button className="buton" onClick={handleDonateClick}>Donează</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Carusel;
