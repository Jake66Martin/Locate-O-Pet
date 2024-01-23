import { useState } from "react";
// import "./LostSeenPetForm.css"

import { useMutation } from "@apollo/client";
import { ADD_PET } from "../../utils/mutations";



export default function LostSeenPetForm({open, hideForm}) {
    if (!open) {
        return (<div></div>);
    }

    const [species, setSpecies] = useState("");
    const [sex, setSex] = useState("");
    const [breed, setBreed] = useState("");
    const [colours, setColours] = useState("");

    const [ addPet ] = useMutation(ADD_PET);

    const handleInputChange = (e) => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = e.target;

        // making sure that the right set function is called depending on the input field user is typing in
        if (name === "species") {
            return setSpecies(value)
        }  else if (name === "sex") {
            return setSex(value)
        }  else if (name === "breed") {
            return setBreed(value)

        } else {
            return setColours(value)
        }
    }

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            await addPet({
                variables: { input: {species, sex, breed, colours }}
            })
        } catch (error) {
            console.log(error)
        }

        hideForm();
        setSpecies("");
        setSex("");
        setBreed("");
        setColours("");

    };

    return (
        <form className="form" onSubmit={handleFormSubmit}>
            <div className="species-input">
                <label>Is your pet cat, dog or a bird?</label>
                <input
                    value={species}
                    name="species"
                    // if user starts typing run handleInputChange function
                    onChange={handleInputChange}
                    // user moves cursor outside of the empty field run blurFunction
                    // onBlur={blurFunction}
                    type="text"
                />
            </div>
            <div className="sex-input">
                <label>Is your pet a girl or a boy?</label>
                <input
                    value={sex}
                    name="sex"
                    onChange={handleInputChange}
                    // onBlur={blurFunction}
                    type="text"
                />
            </div>
            <div className="breed-input">
                <label>What breed is your pet?</label>
                <input
                    value={breed}
                    name="breed"
                    onChange={handleInputChange}
                    // onBlur={blurFunction}
                    type="text"
                />
            </div>
            <div className="colours-input">
                <label>What colour is your pet?</label>
                <input
                    value={colours}
                    name="colours"
                    onChange={handleInputChange}
                    // onBlur={blurFunction}
                    type="text"
                />
            </div>

            <div>
                <button type="submit" className="submit-bttn">
                    Submit
                </button>
            </div>
        </form>
    )
};