import React from 'react'
import Day from './Day';
import { useSelector } from 'react-redux';

const FilteredMonth = ({ month, setShowActionModal }) => {
    const { filteredEvents } = useSelector((state) => state.eventSlice);
    return (<>
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (

                        <Day month={month} eventData={filteredEvents} setShowActionModal={setShowActionModal} day={day} key={idx} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}


        </div>
    </>
    );
}

export default FilteredMonth