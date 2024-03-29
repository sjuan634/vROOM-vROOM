import React from 'react'
import { Card, CardBody, Image, Heading, Stack, Text, Divider, CardFooter, Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const PropertyCard = ({ name, price, description, id, images, available, startDate, endDate }) => {

    const isInRange = startDate && endDate && startDate <= new Date() && endDate >= new Date();

    return (
        <>
            <Card maxW='60'>
                <CardBody >
                    {
                        <Carousel>
                            {
                                images?.map(item => {
                                    return <Image height={40} width={60} src={item} borderRadius='md' />
                                })
                            }
                        </Carousel>
                    }

                    <Stack mt='6' spacing='3'>
                        <Heading color='black' size='sm'>{name}</Heading>
                        <Text color='black' >
                            {description}
                        </Text>
                        <Text color='black' fontSize='md'>
                            ${price} per night
                        </Text>
                    </Stack>
                </CardBody>
                <Divider />
                <CardFooter>
                    {isInRange ? (
                        <Link style={{ width: '100%' }} to={`/property/${id}`}>
                            <Button variant='solid' width="full" colorScheme='purple'>
                                View Property
                            </Button>
                        </Link>) : (
                        <Button variant='solid' width='full' colorScheme='blue'>
                            Sorry Not Available
                        </Button>
                    )}



                </CardFooter>
            </Card>
        </>
    )
}

export default PropertyCard