import React, { useState, ReactNode } from 'react';
import Auth from '../utils/auth';
import { Box, Flex, Link, HStack, IconButton, Button, useDisclosure, useColorModeValue, Stack } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

const Links = [
    {
        name: 'Home',
        href: '/',
    },
    {
        name: 'Globe',
        href: '/globe',
    },
    {
        name: 'Log In',
        href: '/login',
    },
    {
        name: 'Sign Up',
        href: '/signup',
    },
];

const NavLink = ({ children, href }: { children: ReactNode; href: String }) => (
    <Link
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
            textDecoration: 'none',
            bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={href}>
        {children}
    </Link>
);

const Navbar = () => {
    const loggedin = Auth.loggedIn()
    const [showInstallButton, setShowInstallButton] = useState(false)
    const [deferredPrompt, setDeferredPrompt] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleInstallClick = () => {
        if (deferredPrompt) {
            deferredPrompt.prompt()
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User installed the app')
                } else {
                    console.log('User did not install the app')
                }
                setDeferredPrompt(null)
                setShowInstallButton(false)
            })
        }
    }

    return (
        <>
        {loggedin ? (
            <Box bg='#F0F8FF' px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box color='#adadeb' fontWeight='extrabold' fontStyle='italic' >vROOM vROOM</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                                <NavLink key={'Home'} href={'/'}>Home</NavLink>
                                <NavLink key={'Globe'} href={'/globe'}>Globe</NavLink>
                                <Link key={'Log Out'} onClick={() => Auth.logout()}>Log Out</Link>
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink key={'Home'} href={'/'}>Home</NavLink>
                            <NavLink key={'Globe'} href={'/globe'}>Globe</NavLink>
                            <Link key={'Log Out'} onClick={() => Auth.logout()}>Log Out</Link>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        ) : (
            <Box bg='#F0F8FF' px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box color='#adadeb' fontWeight='extrabold' fontStyle='italic' >vROOM vROOM</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', sm: 'flex' }}>
                             {Links.map((link) => (
                                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                            ))}
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link.name} href={link.href}>{link.name}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        )}
        {showInstallButton && <Button style={{ width: '100px', position: 'absolute', right: '10px' }} variant='outline' colorScheme='green' onClick={handleInstallClick}>Install</Button>}
        </>
    )
}

export default Navbar