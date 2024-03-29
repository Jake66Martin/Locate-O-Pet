import "./PetPostCard.css";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { REMOVE_PET } from "../../utils/mutations";
import Auth from '../../utils/auth';
import Swal from 'sweetalert2';

export default function PetPostCard({ pet, setSelectedPetId, refetch }) {

    const [isMobile, setIsMobile] = useState(false);
    const [removePet] = useMutation(REMOVE_PET);

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

    if (pet.status === "isLost") {
        var speciesText = "This is my lost";
        var subclass = "background-red";
        var sexText = "They are a";
    } else if (pet.status === "isSeen") {
        var speciesText = "I saw a";
        var subclass = "background-green";
        var sexText = "A girl or a boy?";
    } else if (pet.status === "isSeen" && pet.breed === "") {
    } else {
        throw new Error(`Unexpected pet status ${pet.status}`);
    }

    const className = `pet-post-card ${subclass}`;
    const onMouseOver = () => {
        setSelectedPetId(pet._id);
    };
    const onMouseOut = () => {
        setSelectedPetId();
    };

    const hidden = (field) => {
        return field ? "" : "hidden";
    };

    const handleRemovePet = async (id, refetch) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
        console.log({ id });
        if (!token) {
            return false;
        }
        try {
            const { data } = await removePet({
              variables: { id }
            });
            refetch();
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div
            id={`pet_${pet._id}`}
            className={className}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
        >
            <h2 className="card-text ">{speciesText} {pet.species}</h2>
            <h2 className="card-text " hidden={!pet.breed}>Breed: {pet.breed}</h2>
            <h2 className="card-text ">Colour: {pet.colours}</h2>
            <h2 className="card-text ">{sexText} {pet.sex}</h2>
            <h2 className="card-text " hidden={!pet.message}>Message: {pet.message}</h2>
            <img className="card-img" hidden={!pet.img} src={pet.img} />
            <div className="text-center">
                {pet.addedByMe && (<button className="btn btn-primary btn-lg" 
                                            onClick={() => {
                                                            handleRemovePet(pet._id, refetch); 
                                                            Swal.fire({
                                                                position: "center-center",
                                                                icon: "success",
                                                                title: "Post has been deleted.",
                                                                showConfirmButton: false,
                                                                timer: 2000,
                                                            });
                                                    }}>
                                        Delete Post
                                    </button>)}
            </div>
        </div>
    );
}
