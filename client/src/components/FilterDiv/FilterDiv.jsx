import "./FilterDiv.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useEffect, useState } from "react";

export default function FilterDiv({ open, onOptionSelection, showButtons, onClickLost, onClickSeen }) {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
        setIsMobile(window.innerWidth <= 1250);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => {
        window.removeEventListener("resize", handleResize);
        };
    }, []);

    if (!open) {
        return <div></div>;
    }

    return (
        <>
            {!isMobile ? (
                <div className="filter-div d-flex flex-column">
                    <div className="text-center">
                        <h1 className="filters-title">Filters</h1>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="all"
                            defaultChecked
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios1"
                        >
                            Show all pets
                        </label>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="onlyLost"
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios2"
                        >
                            Show only lost pets
                        </label>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="onlySeen"
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios3"
                        >
                            Show only seen pets
                        </label>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios4"
                            value="onlyMine"
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios4"
                        >
                            Show my posts
                        </label>
                    </div>
                    <div className="text-center">
                        {showButtons && (
                            <button
                                    className="i-lost-pet-button btn btn-primary bg-red btn-lg"
                                    onClick={onClickLost}
                            >
                                    I lost a pet
                            </button>
                        )}
                    </div>
                    <div className="text-center">
                        {showButtons && (
                            <button
                                    className="i-saw-pet-button btn btn-primary btn-lg"
                                    onClick={onClickSeen}
                            >
                                    I saw a pet
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <div className="filter-div d-flex flex-column align-items-center">
                    <h1 className="filters-title">Filters</h1>
                
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios1"
                            value="all"
                            defaultChecked
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios1"
                        >
                            Show all pets
                        </label>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios2"
                            value="onlyLost"
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios2"
                        >
                            Show only lost pets
                        </label>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios3"
                            value="onlySeen"
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios3"
                        >
                            Show only seen pets
                        </label>
                    </div>
                    <div
                        className="form-check"
                        onChange={(e) => onOptionSelection(e.target.value)}
                    >
                        <input
                            className="form-check-input"
                            type="radio"
                            name="exampleRadios"
                            id="exampleRadios4"
                            value="onlyMine"
                        />
                        <label
                            className="form-check-label text-size"
                            htmlFor="exampleRadios4"
                        >
                            Show my posts
                        </label>
                    </div>
                    <div className="text-center">
                        {showButtons && (
                            <button
                                    className="i-lost-pet-button btn btn-primary bg-red btn-lg"
                                    onClick={onClickLost}
                            >
                                    I lost a pet
                            </button>
                        )}
                    </div>
                    <div className="text-center">
                        {showButtons && (
                            <button
                                    className="i-saw-pet-button btn btn-primary btn-lg"
                                    onClick={onClickSeen}
                            >
                                    I saw a pet
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
