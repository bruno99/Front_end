import React, { FC, useState }from 'react';
import '../components/style.css';
import Films from "../components/films"
import CharactersFC from "../components/characters"
import PlanetsFC from "../components/planets"



function Container() {

    const [state, setState] = useState<string>("null");

    return (
        <div>
            <div className="container">

                <div>Star Wars</div>
                    <div className="button" onClick={() => {
                        setState("film");
                    } }>Films</div>
                    <div className="button" onClick={() => {
                        setState("characters");
                    } }>Characters</div>
                    <div className="button" onClick={() => {
                        setState("planets");
                    } }>Planets</div>
            </div>
            <div>
                {state === "characters" && (<CharactersFC />)}
                {state === "planets" && (<PlanetsFC />)}
                {state === "film" && (<Films />)}
            </div>
        </div>
    );
}


export default Container;
