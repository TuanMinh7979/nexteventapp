import React, {
  useState,
  useEffect,
  useReducer,
  useMemo,
} from "react";

import dayjs from "dayjs";

export const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: (index) => { },

  filterMonthIdx: 0,
  setFilteredMonthIndex: (index) => { },

  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => { },


  daySelected: null,
  setDaySelected: (day) => { },
  showEventModal: false,
  setShowEventModal: () => { },

  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => { },
  setLabels: () => { },
  labels: [],
  updateLabel: () => { },
  filteredEvents: [],
});






export default function GlobalContextProvider(props) {
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const [filterMonthIdx, setFilteredMonthIndex] = useState(dayjs().month());
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(null);
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([]);







  useEffect(() => {
      if (!showEventModal) {
          setSelectedEvent(null);
      }
  }, [showEventModal]);





  return (
      <GlobalContext.Provider
          value={{
              monthIndex,
              setMonthIndex,
              filterMonthIdx,
              setFilteredMonthIndex,
              smallCalendarMonth,
              setSmallCalendarMonth,
              daySelected,
              setDaySelected,
              showEventModal,
              setShowEventModal,
              selectedEvent,
              setSelectedEvent,
            
              setLabels,
              labels,
              
              
          }}
      >
          {props.children}
      </GlobalContext.Provider>
  );
}
