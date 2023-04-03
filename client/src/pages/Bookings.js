import React from 'react'
import { Navbar } from '../components'
import { GET_BOOKINGS, REMOVE_BOOKING } from '../utils/mutations'
import { useMutation, useQuery } from '@apollo/client'
import { Button, Card, CardBody, CardFooter, Heading, Stack, Text } from '@chakra-ui/react'
import { Carousel } from 'react-responsive-carousel'

const Bookings = () => {
    const user_id = localStorage.getItem('user_id')
    const { data, error, loading } = useQuery(GET_BOOKINGS, {
        variables: { bookingId: user_id },
    });
    const [removeBooking, { loading: load, error: err, data: dat }] = useMutation(REMOVE_BOOKING);

    const handleDelete = async (id) => {
        try {
            const result = await removeBooking({
              variables: {
                _id: id,
              },  
            });
            if (result.data.removeBooking._id) {
                alert('Deleted')
                window.location.assign('/bookings')
            }

        } catch (error) {
            console.log(error);
        }
    }

    if (data?.viewBooking.length === 0) {
        return (
            <>
                <Navbar />
                <h1>No Booking</h1>
            </>
        )
    }
    return (
        <>
            <Navbar />
            <div className='card_container'>
                {
                    data?.viewBooking.map(item => (
                        <div className='admin_property'>
    
                            <Card
                                direction={{ base: 'column', sm: 'row' }}
                                overflow='hidden'
                                variant='outline'
                            >
                                <Carousel>
                                    {item.images.map(item => (
                                        <img src={item} height='200px' width='100px' />
                                    ))}
                                </Carousel>
    
                                <stack>
                                    <CardBody>
                                        <Heading size='md'>{item.name}</Heading>
    
                                        <Text py='2'>
                                            Booked For:
                                        </Text>

                                        <Text py='2'>
                                            {item.bookedFor} $
                                        </Text>
    
                                        <Text py='2'>
                                            Amount Paid:
                                        </Text>
                                        
                                        <Text py='2'>
                                            {item.amountPaid}
                                        </Text>
                                    </CardBody>
    
                                    <CardFooter>
                                        <Button onClick={() => { handleDelete(item._id) }} m={10} variant='solid' colorScheme='red'>
                                            Delete
                                        </Button>

                                    </CardFooter>
                                </stack>
                            </Card>            
                        </div>
                    ))
                }
            </div>
        </>
    )
}


export default Bookings