import React from 'react'
import Day from './Day';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
const Month = ({ eventData, month, setShowActionModal }) => {
 


    return (<>
        <div className="flex-1 grid grid-cols-7 grid-rows-5">
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (

                        <Day month={month} eventData={eventData} setShowActionModal={setShowActionModal} day={day} key={idx} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}


        </div>
    </>
    );
}

export default Month