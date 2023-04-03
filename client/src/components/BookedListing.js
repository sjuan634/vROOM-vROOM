
import React, { useState } from 'react';
import { QUERY_PROPERTIES } from '../utils/queries';
// import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import Properties from '../pages/Properties';

function BookedListing () {
  const { data } = useQuery(QUERY_PROPERTIES);
  let properties;

  if (data) {
    properties = data.properties;
  }

  return (
    <>
      <div>
        <h2>Booked Listings</h2>
      </div>
      <div className='booked-container'>
        {Properties.map(properties => (
        <div>
          <div className='booked-thumbnail' key={Properties}></div>
          <div className='booked-info'>
            <p className='booked-address'>{properties.address}</p>
            <p className='booked-address-price'>{properties.price}</p>
            <p className='booked-reserved-dates'>{properties.reservedDates}</p>
          </div>
        </div>
        ))}
      </div>
    </>
  );
};

export default BookedListing;
