// import React from 'react'
// import Auth from '../utils/auth'

// const BookedListing = () => {
//     const loggedin = Auth.loggedIn()

//     return (
//         <>
//             <div>
//             <h2>Booked Listings</h2>
//             </div>
//             <Container className='booked-container'>
//                 <div className='booked-thumbnail'></div>
//                 <div className='booked-info'>
//                     <p className='booked-address'></p>
//                     <p className='booked-address-price'></p>
//                     <p className='booked-reserved-dates'></p>
//                 </div>
//             </Container>
//         </>
//     )
// }

// export default BookedListing

import React, { useEffect, useState } from 'react';
import { Property } from '../../../server/models';
import Auth from '../utils/auth';

const BookedListing = () => {
  const [bookedListings, setBookedListings] = useState([]);

  useEffect(() => {
    const fetchBookedListings = async () => {
      const listings = await Auth.getBookedListings(); // Call the query to fetch booked listings
      setBookedListings(queryProperties);
    };
    fetchBookedListings();
  }, []);

  return (
    <>
      <div>
        <h2>Booked Listings</h2>
      </div>
      <Container className='booked-container'>
        {Property.map(queryProperties => (
        <div>
          <div className='booked-thumbnail' key={Property}></div>
          <div className='booked-info'>
            <p className='booked-address'>{queryProperties.address}</p>
            <p className='booked-address-price'>{queryProperties.price}</p>
            <p className='booked-reserved-dates'>{queryProperties.reservedDates}</p>
          </div>
        </div>
        ))}
      </Container>
    </>
  );
};

export default BookedListing;
