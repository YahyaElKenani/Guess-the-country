import './LoginPage.css'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { FaRegUser } from "react-icons/fa";
import { IoIosInformationCircleOutline } from "react-icons/io";

import { PiBrainDuotone } from "react-icons/pi";

import { Link } from 'react-router-dom';
export default function LoginPage () { 
    const [username, setUsername] = useState('');
    const [showHowToPlay, setShowHowToPlay] = useState(false); 
    const [loggedIn, setLoggedIn] = useState(false);
    const containerVariants = { 
        visible: { 
            transition: { 
                staggerChildren: 0.4
            }
        }
    }
    const headingVariants = { 
        hidden: { 
            x: 100, 
            opacity: 0
        }, 
        visible: { 
            x: 0,
            opacity: 1,
            transition: { 
                duration: 0.5
            }
        }
    }
    const formVariants = { 
        tap: {
            scale: 0.95,
        },
        hidden: { 
            opacity: 0,
            y: 100, 
        },
        visible: {
            opacity: 1,
            y: 0, 
            transition: { 
                duration: 0.5,
                delay: 0.7
            }
        },
        exit: { 
            opacity: 0,
            x: -100,
                transition: { 
                duration: 0.5,
            }
        }
    }
    const difficultyVariants = { 
        hidden: { 
            opacity: 0,
            x: 100,
        }, 
        visible: { 
            opacity: 1,
            x: 0,
            transition: { 
                duration: 0.5
            }
        }
    }
    const confirmUsername = () => { 
        setLoggedIn(true);
    }
    const handleClose = () => setShowHowToPlay(false);
    return ( 
        <>
            <Motion.div className='login-heading d-flex flex-column align-items-center gap-1'
            layout
                variants = {containerVariants}
                initial = 'hidden'
                animate = 'visible'
            >
                <Motion.span className='display-6' variants={headingVariants}>Welcome To</Motion.span>
                <Motion.h1 className='display-md-1 display-5 fw-bold' variants={headingVariants}>Guess The Country</Motion.h1>
                <Motion.span className='display-6' variants={headingVariants}>Game</Motion.span>
            </Motion.div>
            <AnimatePresence mode='wait'> 
                    {
                    loggedIn === false ? 
                <Motion.div key='form' variants={formVariants}      
                        layout                    
                        initial='hidden' 
                        animate='visible' 
                        exit='exit' className='d-flex flex-column align-items-center gap-2'>
                        <Motion.label className='d-flex align-items-center gap-2' variants={formVariants} 
                        htmlFor='username'>
                            <FaRegUser />
                            Enter Your Name
                            </Motion.label>
                        <Motion.input onChange={(e) => setUsername(e.currentTarget.value)} type='text' whileFocus={{scale: 1.1}} whileTap='tap' autoComplete='off' 
                        variants={formVariants} layout id='username' className='fw-bold'/>
                                <Motion.div variants={formVariants} className='d-flex gap-1'>
                                    <Motion.button onClick={() => confirmUsername()} 
                                    whileTap='tap' className='btn btn-outline-success fw-bold'>Confirm</Motion.button>
                                    <Motion.button onClick={() => {
                                    setUsername('Guest')
                                    setLoggedIn(true)
                                }}
                                    whileTap='tap' className='btn btn-outline-secondary fw-bold'>Ignore</Motion.button>
                                </Motion.div> 
                    </Motion.div>
                    :
                    <Motion.div layout className='d-flex flex-column align-items-center gap-2'
                    variants={difficultyVariants}
                    initial='hidden'
                    animate='visible'
                    >
                        <label className='d-flex align-items-center gap-2'>
                            <PiBrainDuotone />
                            Select Your Difficulty
                        </label>
                        <div className='difficulties d-flex align-items-center justify-content-center flex-wrap gap-2'>
                            <Link to={'/game'} state={{name: username, mode: 'Easy'}} className='btn btn-outline-warning'>Easy</Link>
                            <Link to={'/game'} state={{name: username, mode: 'Medium'}} className='btn btn-outline-warning'>Medium</Link>
                            <Link to={'/game'} state={{name: username, mode: 'Hard'}} className='btn btn-outline-warning'>Hard</Link>
                            <Link to={'/game'} state={{name: username, mode: 'Very Hard'}} className='btn btn-outline-warning'>Very Hard</Link>
                            <Link to={'/game'} state={{name: username, mode: 'Impossible'}} className='btn btn-outline-danger'>Impossible</Link>
                            <Link to={'/game'} state={{name: username, mode: 'Challenge'}} className='btn btn-outline-warning'>Challenge</Link>
                        </div>
                            <button className='btn btn-outline-secondary d-flex align-items-center gap-2' onClick={() => setShowHowToPlay(true)}>
                                <IoIosInformationCircleOutline size='24px' />
                                How To Play
                                </button>
                            <Modal size='lg' centered show={showHowToPlay} onHide={handleClose} >
                                <Modal.Header closeButton >
                                    <Modal.Title className='text-dark d-flex gap-2 align-items-center'>
                                    <IoIosInformationCircleOutline size='24px' />
                                    <div className='fw-bold fs-4'>How To Play</div>
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body className='d-flex flex-column gap-3 text-dark'>
                                    <ul className='fw-bold d-flex flex-column gap-2'>
                                        <span>
                                            - You recieve 5 clues (Continent - Area - Population - Subregion - Capital)
                                            <br></br>
                                            for a country chosen randomly according to the level you choose
                                
                                        </span>
                                        <li>
                                            Easy Mode : 
                                            <ul>
                                                <li>3 lives</li>
                                                <li>Unlimited Timer</li>
                                            </ul>
                                            </li>
                                        <li>
                                            Medium Mode :
                                            <ul>
                                                <li>3 lives</li>
                                                <li>120 Sec</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Hard Mode :
                                            <ul>
                                                <li>3 lives</li>
                                                <li>90 Sec</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Very Hard Mode :
                                            <ul>
                                                <li>3 lives</li>
                                                <li>90 Sec</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Impossible Mode ( لو راجل حل ) :
                                            <ul>
                                                <li>3 lives</li>
                                                <li>90 Sec</li>
                                            </ul>
                                        </li>
                                        <li>
                                            Challenge Mode (Recommended) :
                                            <ul>
                                                <li>Countries Combined From Both Easy And Medium Modes</li>
                                                <li>1 live</li>
                                                <li>60 Sec</li>
                                            </ul>
                                        </li>
                                    </ul>
                                </Modal.Body>
                            </Modal>
                    </Motion.div>
                    }
                </AnimatePresence>
        </>
    )
}