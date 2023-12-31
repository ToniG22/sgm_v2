import React, { useState, useEffect } from "react";
import EventsGrid from "./EventsGrid";
import { CiLocationOn } from "react-icons/ci";
import backgroundImage from '../../public/madeiraMapa.png';

const Map = () => {

  const [events, setEvents] = useState([]);

  const reloadEvents = () => {
    const storedEvents = localStorage.getItem("events");
    const parsedEvents = storedEvents ? JSON.parse(storedEvents) : [];
    setEvents(parsedEvents);
  };

  const isEventNextWeek = (event) => {
    const eventEndDate = new Date(event.endDate);
    const eventBeginDate = new Date(event.beginDate)
    const nextWeekEndDate = new Date();
    nextWeekEndDate.setDate(nextWeekEndDate.getDate() + 7);

    const nextWeekBeginDate = new Date();
    nextWeekBeginDate.setDate(nextWeekBeginDate.getDate());

    console.log(nextWeekBeginDate + nextWeekEndDate)

    console.log(eventBeginDate + eventEndDate)


    return eventBeginDate >= nextWeekBeginDate && eventEndDate <= nextWeekEndDate;
  };

  useEffect(() => {
    reloadEvents();
  }, []);

  const localidades = {
    location1: {
      name: "Funchal",
      top: "541px",
      left: "731px",
    },
    location2: {
      name: "Ribeira Brava",
      top: "457px",
      left: "389px",
    },
    location3: {
      name: "Santa Cruz",
      top: "501px",
      left: "954px",
    },
    location4: {
      name: "Câmara de Lobos",
      top: "506px",
      left: "565px",
    },
    location5: {
      name: "Calheta",
      top: "259px",
      left: "67px",
    },
    location6: {
      name: "Machico",
      top: "334px",
      left: "1084px",
    },
    location7: {
      name: "Santana",
      top: "164px",
      left: "787px",
    },
    location8: {
      name: "São Vicente",
      top: "200px",
      left: "473px",
    },
    location9: {
      name: "Porto Moniz",
      top: "62px",
      left: "102px",
    },
    location10: {
      name: "Ponta do Sol",
      top: "365px",
      left: "233px",
    },
  };

  var [selectedLocation, setSelectedLocation] = useState("");

  const locationEventsFestivais = events.filter(
    (event) => event.location === selectedLocation && event.type === "festivais"
  );

  const locationEventsArraiais = events.filter(
    (event) => event.location === selectedLocation && event.type === "arraiais"
  );

  return (
    <div>
      
      {!selectedLocation && (
        <div>
          <h1 className="title"> Escolha a freguesia: </h1>
          <div className="mapPos" style={{ backgroundImage: `url(${backgroundImage})` }}>
          {Object.values(localidades)
            .filter((location) =>
              events.some(
                (event) =>
                  event.location === location.name &&
                  (event.type === "festivais" || event.type === "arraiais")
              )
            )
            .map((location, index) => (
              <div
                className="mapNeedle"
                style={{
                  position: "absolute",
                  top: location.top,
                  left: location.left,
                }}
                key={index}
              >
                <button
                  onClick={() => setSelectedLocation(location.name)}
                  className={`locationButton ${
                    selectedLocation === location.name ? "active" : ""
                  }`}
                >
                  {location.name}
                </button>
                <CiLocationOn
                  size={75}
                  fill={
                    events.some(
                      (event) =>
                        event.location === location.name &&
                        (event.type === "festivais" || event.type === "arraiais") &&
                        isEventNextWeek(event)
                    )
                      ? "#FEDB39"
                      : "white"
                  }
                  className={`ciLocationOn ${
                    selectedLocation === location.name ? "hidden" : ""
                  }`}
                />
              </div>
        ))}
          </div>
          <div className="mapLegend">
            <p className="mapLegendItem"><CiLocationOn size={25} fill="white"></CiLocationOn> - Eventos brevemente!</p>
            <p className="mapLegendItem"><CiLocationOn size={25} fill="#FEDB39"></CiLocationOn> - Eventos próxima semana!</p>
          </div>
        </div>
        
      )}

      {selectedLocation && (
        <div className="MapTitle">
          <h1>Festivais</h1>
          {locationEventsFestivais.length > 0 ? (
            <EventsGrid events={locationEventsFestivais} />
          ) : (
            <p className="noEvents">
              Não existem festivais a ocorrer na localidade: {selectedLocation}.
            </p>
          )}
          <h1>Arraiais</h1>
          {locationEventsArraiais.length > 0 ? (
            <EventsGrid events={locationEventsArraiais} />
          ) : (
            <p className="noEvents">
              Não existem arraiais a ocorrer na localidade: {selectedLocation}.
            </p>
          )}
          <button className="EventLink voltarAtras" onClick={() => setSelectedLocation("")}>
            Voltar ao mapa
          </button>
        </div>
      )}
    </div>
  );
};

export default Map;
