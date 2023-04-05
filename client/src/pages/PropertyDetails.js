import { GET_PROPERTY } from '../utils/mutations';
import { useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Text, Image } from '@chakra-ui/react';
import { Navbar } from '../components';
import { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { CREATE_CHECKOUT_SESSION } from '../utils/mutations';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const PropertyDetails = () => {


    const loggedIn = Auth.loggedIn()

    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [numNights, setNumNights] = useState(0);
    const { id } = useParams()
    const [bill, setBill] = useState(0)


    const { data } = useQuery(GET_PROPERTY, {
        variables: { propertyId: id },
    });

    const [createCheckoutSession] = useMutation(CREATE_CHECKOUT_SESSION);

    const property = data?.property

    const handleStartDateSelect = (date) => {
        setStartDate(date);
        calculateNights(date, endDate);
    }

    const handleEndDateSelect = (date) => {
        setEndDate(date);
        calculateNights(startDate, date);
    }

    const calculateNights = (start, end) => {
        if (start && end) {
            const diffInMs = end.getTime() - start.getTime();
            const diffInDays = diffInMs / (1000 * 60 * 60 * 24);
            const numNights = Math.round(diffInDays);
            setNumNights(numNights);
        }
    }

    useEffect(() => {
        setBill(numNights * property?.night_cost)
    }, [numNights, property?.night_cost])


    const handleSubmit = async () => {
        try {
            const { data } = await createCheckoutSession({
                variables: { propertyId: id, nights: parseInt(numNights) },
            });
            window.location = data.createCheckoutSession.url;
        } catch (error) {
            alert(error)
        }

    }
    console.log(property)
    return (
        <>
            <Navbar />
            <div className='details_page'>
                <h1 className='details_title'>{property?.name}</h1>
                <div className='property_details'>
                    <div>Rooms: {property?.bed_number}</div>
                    <div>Bathrooms: {property?.bath_number}</div>
                    <div>Guests: {property?.max_guests}</div>
                </div>
                <div className='property_main'>
                    <Carousel className='carousel' showThumbs={false} width="60%">
                    {property?.images.map(item => (
                        <Image key={item} src={item} />
                    ))}
                    </Carousel>
                    <div>
                        <Text width="100%" display="inline" fontWeight='bold'>Description: {property?.description} </Text>

                        <div className='property_main_details'>
                            <div textAlign="center"
>
                            <Text>Select Check in Date:</Text>
                            <DatePicker
                                portalId="root-portal"
                                selected={startDate}
                                onChange={handleStartDateSelect}
                                placeholderText='MM/DD/YYYY'
                                filterDate={d => {
                                    return new Date() < d;
                                  }}
                                />
                        </div>
                        <div>
                            <Text>Select Check out Date:</Text>
                            <DatePicker
                                portalId="root-portal"
                                selected={endDate}
                                onChange={handleEndDateSelect}
                                placeholderText='MM/DD/YYYY'
                                className="datePicker"
                                filterDate={d => {
                                    return new Date() < d;
                                  }} />
                        </div>
                    </div>
                    <div className='night_input'>
                        <Text paddingBottom="10px"> Total nights: {numNights}</Text>
                        
                    </div>
                    
                    <div className='bill_card'>
                        <h3>Bill Details</h3>
                        <div className='bill_item'>
                            <p>Nightly Cost </p>
                            <p>${property?.night_cost}</p>
                        </div>

                        <div className='bill_item total_bill'>
                            <p>Grand Total: </p>
                            <p>${bill}</p>
                        </div>
                        {
                        loggedIn ? (

                            <button onClick={handleSubmit} className='reserve_btn'>Pay and Reserve</button>
                        ) : (
                            <button disabled className='reserve_btn disabled'>Log in to reserve</button>

                        )
                    }
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}

export default PropertyDetails