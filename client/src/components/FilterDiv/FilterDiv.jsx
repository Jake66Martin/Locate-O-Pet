import "./FilterDiv.css"

export default function FilterDiv({open}) {
    if (!open) {
        return (<div></div>);
    }

    return (
        <div className="filter-div d-flex flex-column align-items-center">
            <h1 className="filters-title">Filters</h1>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                <label className="form-check-label" htmlFor="exampleRadios1">
                    Show all pets
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                <label className="form-check-label" htmlFor="exampleRadios2">
                    Show only lost pets
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                <label className="form-check-label" htmlFor="exampleRadios3">
                    Show only seen pets
                </label>
            </div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                <label className="form-check-label" htmlFor="exampleRadios1">
                    Show my posts
                </label>
            </div>
        </div>
    )
}