import { useLocation, useNavigate } from "react-router-dom"
import { easyCountries, mediumCountries, hardCountries, veryHardCountries, impossibleCountries } from "../../constants/constants";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import {AnimatePresence, motion as Motion} from 'framer-motion'
import './Game.css'
import img from '../../Images/Screenshot 2025-06-27 062041.png'
import { MdOutlineTimer } from "react-icons/md";
import { Bounce, toast, ToastContainer } from "react-toastify";
export default function Game() { 
    const location = useLocation(); 
    const {name, mode} = location.state || {};
    const [countries, setCountries] = useState([]);
    const [currentCountry, setCurrentCountry] = useState('');
    const [guessTheCountry, setGuessTheCountry] = useState({}); 
    const [welcomeMsg, setWelcomeMsg] = useState(true);
    const [gameStartedMsg, setGameStartedMsg] = useState(true);
    const [gameEnded, setGameEnded] = useState(false); 
    const [timer, setTimer] = useState(90);
    const [numberOfGuesses, setNumberOfGuesses] = useState(0);
    const [guess, setGuess] = useState('');
    const [guessesMade, setGuessesMade] = useState(0);
    const [wrongGuess, setWrongGuess] = useState(false);
    const isFirstRender = useRef(true);
    const navigate = useNavigate();
    useEffect(() => {
        switch(mode) { 
            case 'Easy': 
            setCountries(easyCountries);
            setTimer('∞');
            setNumberOfGuesses(3);
            break;
            case 'Medium': 
            setCountries (mediumCountries);
            setTimer(120);
            setNumberOfGuesses(3);
            break;
            case 'Hard': 
            setCountries(hardCountries);
            setTimer(90);
            setNumberOfGuesses(3);
            break;
            case 'Very Hard':
            setCountries(veryHardCountries);
            setTimer(90);
            setNumberOfGuesses(3);
            break;
            case 'Impossible': 
            setCountries(impossibleCountries);
            setTimer(90);
            setNumberOfGuesses(3);
            break;
            case 'Challenge': 
            setCountries([...easyCountries, ...mediumCountries]);
            setTimer(60);
            setNumberOfGuesses(1);
            break;
        }
    }, [])
    const getRandomInRange = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    useEffect(() => {
        setCurrentCountry(countries[getRandomInRange(0, countries.length - 1)]); 
    }, [countries])
    useEffect(() => {
        if (currentCountry) { 
            axios.get(`https://restcountries.com/v3.1/name/${currentCountry}`)
            .then(response => setGuessTheCountry(
                {
                    name: response.data[0].name.common || 'Unknown',
                    flag: response.data[0].flags.png,
                    capital: response.data[0].capital || 'Unknown',
                    population: response.data[0].population || 'Unknown',
                    continent: response.data[0].continents[0] || 'Unknown',
                    area: response.data[0].area || 'Unknown',
                    subregion: response.data[0].subregion || 'Unknown'
                }
            ))
            .catch(error => console.error(error))
        }
    }, [currentCountry]);
    // displaying introduction messages
    useEffect(() => {
        const welcomeTimer = setTimeout(() => {
            setWelcomeMsg(false);
        }, 1500);
        const startTimer = setTimeout(() => {
            setGameStartedMsg(false);
        }, 3500);
        return () => {
            clearTimeout(welcomeTimer);
            clearTimeout(startTimer);
        };
    }, [])

    const messageVariant = { 
        hidden: { 
            opacity: 0, y: 100
        }, 
        visible: { 
            opacity: 1, y: 0,
            transition: { 
                duration: 0.5,
                delay: 0.5
            }
        }, 
        exit: { 
            opacity: 0, y: -100,
            transition: { 
                duration: 0.5
            }
        }
    }
    const cluesVariant = { 
        hidden: {}, 
        visible: { 
            transition: { 
                delayChildren: 1,
                staggerChildren: gameEnded ? 0 : 5
            }
        }
        
    }
    const clueVariant = { 
        hidden: { 
            opacity: 0, y: 100
        }, 
        visible: { 
            opacity: 1, y: 0,
            transition: { 
                duration: 0.5, 
            
        }
    }
}
    const startTimer = () => { 
    const interval = setInterval(() => {
        setTimer((prevState) => {
            if (!gameEnded) { 
                if (prevState === 0) { 
                    clearInterval(interval);
                    return 0
                }
                return prevState - 1
            }
        }); 
    }, 1000);
}
    useEffect(() => {
        if (isFirstRender.current) { 
            isFirstRender.current = false; 
            return;
        }
        else if (timer === 0) { 
            setGameEnded(true);
            toast('You Lost! Redirecting to homepage', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        }
    }, [timer])
    const makeGuess = () => { 
        if (guess.toLowerCase() === guessTheCountry.name.toLowerCase()) { 
            setGameEnded(true); 
            toast('You Won! Redirecting to homepage', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
                });
        } else { 
            if (guessesMade !== numberOfGuesses) { 
                setWrongGuess(true);
                setTimeout(() => {
                    setWrongGuess(false);
                }, 500);
                if ( numberOfGuesses - guessesMade === 1 ) { 
                    setGameEnded(true);
                    toast('You Lost! Redirecting to homepage', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                    });
                }
                setGuessesMade((prevState) => prevState + 1)
                setGuess('')
            }
        }
    }
    useEffect(() => {
        if (gameEnded) {
            setTimeout(() => {
                navigate('/');
            }, 5200);
        }
    }, [gameEnded])
    return ( 
        <>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition={Bounce}
            />
            <AnimatePresence mode="wait"> 
                {
                    welcomeMsg &&
                    <Motion.h1
                    key='welcome'
                    variants={messageVariant}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className="text-center display-md-1 display-4"
                    >Welcome To The Game, <span className="fw-bold">{name}</span>! - <span className="mode-name">{mode}</span> Mode</Motion.h1> 
                }
                { 
                    !welcomeMsg && gameStartedMsg && ( 
                    <Motion.h1
                    key='start'
                    variants={messageVariant}
                    initial='hidden'
                    animate='visible'
                    exit='exit'
                    className="display-1 fw-bold mode-name"
                    > 
                        Game Started! 
                    </Motion.h1>
                    )
                }
            {/* Main Game */}
                { 
                    welcomeMsg === false && gameStartedMsg === false && 
                    ( 
                        <> 
                            <Motion.div 
                            initial={{opacity: 0, y: 100}}
                            animate={{opacity: 1, y: 0}}
                            transition={{duration: 0.5, delay: 0.5}}
                            onAnimationComplete={mode !== 'Easy' ? () => startTimer(): ''}
                            layout
                            className="game d-flex flex-column align-items-center gap-2"> 
                                <div className="header d-flex align-items-center gap-3">
                                    <div className="game-mode fs-3">Mode: {mode}</div>
                                    <div className="mode-name fs-2">|</div>
                                    <div className="d-flex align-items-center gap-2">  
                                        <MdOutlineTimer size={35} />
                                        <div className="display-4 timer">{gameEnded ? '0' : timer}</div>
                                    </div>
                                </div>
                                <Motion.div className="country"> 
                                    { 
                                        gameEnded ? 
                                        <> 
                                            <div className="country-flag">
                                                <img src={guessTheCountry.flag} />
                                            </div>
                                            <div className="country-name fw-bold display-6">
                                                {guessTheCountry.name}
                                            </div>
                                        </>
                                        : 
                                        <> 
                                            <div className="country-flag">
                                                <img src={img} />
                                            </div>
                                            <div className="country-name fw-bold display-6">
                                                ???
                                            </div>
                                            <div className="guess d-flex align-items-center gap-4">
                                                <Motion.input whileFocus={{scale: 1.1}} onChange={(e) => setGuess(e.currentTarget.value)} value={guess}
                                                placeholder={`Make a guess (${guessesMade}/${numberOfGuesses})`} className={`user-guess fw-bold ${wrongGuess ? 'wrong-guess' : ''}`} />
                                                <Motion.button whileTap={{scale: 0.9}} onClick={() => makeGuess()}
                                                className="submit-guess btn btn-warning">Guess</Motion.button>
                                            </div>
                                        </>
                                    }
                                </Motion.div>
                            </Motion.div>
                            <Motion.ol
                            key='game'
                            variants={cluesVariant}
                            initial='hidden'
                            animate='visible'
                            layout
                            className="clues fw-bold d-flex justify-content-start flex-column gap-2">
                                <Motion.li
                                variants={clueVariant}
                                className="clue fs-3 d-flex flex-wrap align-items-center gap-3">
                                    <div className="clue-name">Contienent:</div>
                                    <div className="d-flex gap-2">
                                        {guessTheCountry.continent}
                                    </div>
                                </Motion.li>
                                <Motion.li
                                variants={clueVariant}
                                className="clue fs-3 d-flex align-items-center gap-3">
                                    <div className="clue-name">Subregion:</div>
                                    <div> {guessTheCountry.subregion} </div>
                                </Motion.li>
                                <Motion.li
                                variants={clueVariant}
                                className="clue fs-3 d-flex align-items-center gap-3">
                                    <div className="clue-name">Capital:</div>
                                    <div> {guessTheCountry.capital} </div>
                                </Motion.li>
                                <Motion.li
                                variants={clueVariant}
                                className="clue fs-3 d-flex align-items-center gap-3">
                                    <div className="clue-name">Area:</div>
                                    <div> {guessTheCountry.area} km<sup>2</sup> </div>
                                </Motion.li>
                                <Motion.li
                                variants={clueVariant}
                                className="clue fs-3 d-flex align-items-center gap-3">
                                    <div className="clue-name">Population:</div>
                                    <div> {guessTheCountry.population} </div>
                                </Motion.li>
                            </Motion.ol>               
                        </>
                    )
                }
            </AnimatePresence>
        </>
    )
}