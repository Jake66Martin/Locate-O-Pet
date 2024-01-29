import "./PetPostCard.css"

export default function PetPostCard(pet) {
    // console.log(pet.img)
    if (pet.status === "isLost") {
        var speciesText = "This is my lost";
        var subclass = "background-red";
        var sexText = "They are a"
    } else if (pet.status === "isSeen") {
        var speciesText = "I saw a";
        var subclass = "background-green";
        var sexText = "A girl or a boy?"
    } else {
        throw new Error(`Unexpected pet status ${pet.status}`)
    }
    const className = `pet-post-card ${subclass}`
    const onMouseOver = () => {pet.setSelectedPetId(pet._id)}
    const onMouseOut = () => {pet.setSelectedPetId()}

    return (
    <div className= {className} onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
            <h2 className="card-text text-center">{speciesText} {pet.species}</h2>
            <h2 className="card-text text-center">Breed: {pet.breed}</h2>
            <h2 className="card-text text-center">Colour: {pet.colours}</h2>
            <h2 className="card-text text-center">{sexText} {pet.sex}</h2>
            <h2 className="card-text text-center">Message: {pet.message}</h2>
            <img className="card-img" src={pet.img}/>
        </div>
    )
}