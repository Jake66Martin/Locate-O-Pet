/*******************************************************************
 * Carleton Bootcamp - 2024
 * Copyright 2024 Sonja Gorin, Jacob Martin, Gustavo Miller
 * License: free and unencumbered software
 * Assignment # 20 - React Portfolio
 *
 * Filename: map.jsx
 * Date : 1/22/2024 9:05:01 PM
 *******************************************************************/
// import '../App.css';
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import LostPetForm from "../components/PetForms/LostPetForm";
import SeenPetForm from "../components/PetForms/SeenPetForm";
import MapArea from "../components/MapArea/MapArea";
import PetsDiv from "../components/PetsDiv/PetsDiv";
import FilterDiv from "../components/FilterDiv/FilterDiv";
import Auth from "../utils/auth";

import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ALLPETS } from "../utils/queries";

import "./map.css";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZ3NvbmphIiwiYSI6ImNscm9kZ3RheDFoMGoybG9mZGZiNGphOG4ifQ.xYb4Ch19HGpuJpK2BXQ3tg";

const LeftPanel = {
  PetsList: 0,
  LostPetForm: 1,
  SeenPetForm: 2,
};

function comparePets(pet1, pet2) {
  const pet1CreatedAt = new Date(pet1.createdAt);
  const pet2CreatedAt = new Date(pet2.createdAt);
  if (pet1CreatedAt > pet2CreatedAt) return -1;
  return 1;
}

export default function Map() {
  // console.log("Rendering Map");
  const [leftPanel, setLeftPanel] = useState(LeftPanel.PetsList);
  // const [showSeenPetForm, setShowSeenPetForm] = useState(false);
  const [userMarker, setUserMarker] = useState();
  const [showButtons, setShowButtons] = useState(true);
  const [pets, setPets] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(Auth.loggedIn());
  const [selectedPetId, setSelectedPetId] = useState();
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

  const petsFetched = (data) => {
    console.log("Fetched pets");
    console.log(data.allPets);
    var pets = [...data.allPets];
    pets.sort(comparePets);
    console.log(pets);
    setPets(pets);
    if (pets) {
      setSelectedPetId();
    }
  };

  //     console.log(isLoggedIn)

  const { loading, refetch } = useQuery(QUERY_ALLPETS, {
    onCompleted: petsFetched,
  });

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <>
      {
        !isMobile ? (
          <div className="page-height">
            <div className="pet-form-map">
              <div className="form-div">
                <FilterDiv open={leftPanel == LeftPanel.PetsList} />
                <PetsDiv
                  pets={pets}
                  open={leftPanel == LeftPanel.PetsList}
                  setSelectedPetId={setSelectedPetId}
                />
                <SeenPetForm
                  open={leftPanel == LeftPanel.SeenPetForm}
                  hideForm={() => {
                    setLeftPanel(LeftPanel.PetsList);
                    setUserMarker(null);
                    refetch();
                  }}
                  userMarker={userMarker}
                />
                <LostPetForm
                  open={leftPanel == LeftPanel.LostPetForm}
                  hideForm={() => {
                    setLeftPanel(LeftPanel.PetsList);
                    setUserMarker(null);
                    refetch();
                  }}
                  userMarker={userMarker}
                />
              </div>
              <div className="map-div">
                <MapArea
                  userMarker={userMarker}
                  ignoreClick={leftPanel == LeftPanel.PetsList}
                  setUserMarker={setUserMarker}
                  pets={pets}
                  selectedPetId={selectedPetId}
                />
              </div>
            </div>
            {isLoggedIn && showButtons && (
              <button
                className="i-lost-pet-button btn btn-primary bg-red btn-lg"
                onClick={() => {
                  setLeftPanel(LeftPanel.LostPetForm);
                  setShowButtons(false);
                }}
              >
                I lost a pet
              </button>
            )}
            {isLoggedIn && showButtons && (
              <button
                className="i-saw-pet-button btn btn-primary btn-lg"
                onClick={() => {
                  setLeftPanel(LeftPanel.SeenPetForm);
                  setShowButtons(false);
                  setUserMarker(null);
                }}
              >
                I saw a pet
              </button>
            )}
          </div>
        ) : (
          <div className="page-height">
            <div className= "d-flex flex-column">
              <div className="form-div2">
                <FilterDiv open={leftPanel == LeftPanel.PetsList} />
                <PetsDiv
                  pets={pets}
                  open={leftPanel == LeftPanel.PetsList}
                  setSelectedPetId={setSelectedPetId}
                />
                <SeenPetForm
                  open={leftPanel == LeftPanel.SeenPetForm}
                  hideForm={() => {
                    setLeftPanel(LeftPanel.PetsList);
                    setUserMarker(null);
                    refetch();
                  }}
                  userMarker={userMarker}
                />
                <LostPetForm
                  open={leftPanel == LeftPanel.LostPetForm}
                  hideForm={() => {
                    setLeftPanel(LeftPanel.PetsList);
                    setUserMarker(null);
                    refetch();
                  }}
                  userMarker={userMarker}
                />
              </div>
              <div className="map-div2">
                <MapArea
                  userMarker={userMarker}
                  ignoreClick={leftPanel == LeftPanel.PetsList}
                  setUserMarker={setUserMarker}
                  pets={pets}
                  selectedPetId={selectedPetId}
                />
              </div>
            </div>
            {isLoggedIn && showButtons && (
              <button
                className="i-lost-pet-button btn btn-primary bg-red btn-lg"
                onClick={() => {
                  setLeftPanel(LeftPanel.LostPetForm);
                  setShowButtons(false);
                }}
              >
                I lost a pet
              </button>
            )}
            {isLoggedIn && showButtons && (
              <button
                className="i-saw-pet-button btn btn-primary btn-lg"
                onClick={() => {
                  setLeftPanel(LeftPanel.SeenPetForm);
                  setShowButtons(false);
                  setUserMarker(null);
                }}
              >
                I saw a pet
              </button>
            )}
          </div>
        )
      }
    </>
  );
}
