import React, { useState } from 'react';
import './register.css';
import { LuInfinity } from "react-icons/lu";
import SignIn from '../SignIn/SignIn';

const Register = () => {
  const [selectedPlan, setSelectedPlan] = useState('lifetime'); // Default: Premium Lifetime
  const [showSignIn, setShowSignIn] = useState(false);

  if (showSignIn) {
    return <SignIn />;
  }

  return (
    <div className='register'>
        <div className="registerContainer">
            <div className="registerContainerDiv">
                {/* Left Part */}
                <div className="registerContainerDivLeft">
                    <div className="registerContainerDivLeftContainer">
                        <div className="registerContainerDivLeftContainerDiv">
                            <div className="registerContainerDivLeftContainerDivOne">
                                <div className="registerContainerDivLeftContainerDivOneContainer">
                                    <div className="registerContainerDivLeftContainerDivOneContainerDiv">
                                        <p className="registerContainerDivLeftContainerDivOneContainerDivText">
                                            Sign up for Mockly Premium
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="registerContainerDivLeftContainerDivTwo">
                                <div className="registerContainerDivLeftContainerDivTwoContainer">
                                    <div className="registerContainerDivLeftContainerDivTwoContainerDiv">

                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivOne">
                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainer">
                                                <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDiv">
                                                    <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivOne">
                                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivOneContainer">
                                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivOneContainerDiv">
                                                                <p className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivOneContainerDivText">
                                                                    Email
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivTwo">
                                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivTwoContainer">
                                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivTwoContainerDiv">
                                                                <input type="text" className='registerContainerDivLeftContainerDivTwoContainerDivOneContainerDivTwoContainerDivInput' placeholder='Enter your email' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivTwo">
                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainer">
                                                <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDiv">
                                                    <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivOne">
                                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivOneContainer">
                                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivOneContainerDiv">
                                                                <p className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivOneContainerDivText">
                                                                    Password
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivTwo">
                                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivTwoContainer">
                                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivTwoContainerDiv">
                                                                <input type="password" className='registerContainerDivLeftContainerDivTwoContainerDivTwoContainerDivTwoContainerDivInput' placeholder='Create a password' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivThree">
                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainer">
                                                <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDiv">
                                                    <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivOne">
                                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivOneContainer">
                                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivOneContainerDiv">
                                                                <p className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivOneContainerDivText">
                                                                    Confirm Password
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivTwo">
                                                        <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivTwoContainer">
                                                            <div className="registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivTwoContainerDiv">
                                                                <input type="password" className='registerContainerDivLeftContainerDivTwoContainerDivThreeContainerDivTwoContainerDivInput' placeholder='Confirm your password' />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="registerContainerDivLeftContainerDivThree">
                                <div className="registerContainerDivLeftContainerDivThreeContainer">
                                    <div className="registerContainerDivLeftContainerDivThreeContainerDiv">
                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivOne">
                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivOneContainer">
                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivOneContainerDiv">
                                                    <p className="registerContainerDivLeftContainerDivThreeContainerDivOneContainerDivText">
                                                        Choose a plan
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwo">
                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainer">
                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDiv">

                                                    {/* Premium Weekly Plan */}
                                                    <div className={`registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElement ${selectedPlan === 'weekly' ? 'active' : ''}`} 
                                                         onClick={() => setSelectedPlan('weekly')}>
                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainer">
                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDiv">

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOne">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainerDiv">
                                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainerDivEle">
                                                                                <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainerDivEleText">
                                                                                    20% OFF
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwo">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwoContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwoContainerDiv">
                                                                            <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwoContainerDivText">
                                                                                Premium Weekly
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThree">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDiv">
                                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEle">
                                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleOne">
                                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleOneContainer">
                                                                                        <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleOneContainerText">
                                                                                            $1.59
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleTwo">
                                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleTwoContainer">
                                                                                        <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleTwoContainerText">
                                                                                            /week
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFour">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFourContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFourContainerDiv">
                                                                            <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFourContainerDivText">
                                                                                Normal price: $1.99
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFive">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainerDiv">
                                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainerDivEle">
                                                                                <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainerDivEleText">
                                                                                    Unlock all premium features with our limited-time launch discount
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>


                                                    {/* Premium Lifetime Plan */}
                                                    <div className={`registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElement ${selectedPlan === 'lifetime' ? 'active' : ''}`}
                                                         onClick={() => setSelectedPlan('lifetime')}>
                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainer">
                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDiv">

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOne">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainerDiv">
                                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainerDivEle">
                                                                                <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivOneContainerDivEleText">
                                                                                    50% OFF
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwo">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwoContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwoContainerDiv">
                                                                            <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivTwoContainerDivText">
                                                                                Premium Lifetime
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThree">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDiv">
                                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEle">
                                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleOne">
                                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleOneContainer">
                                                                                        <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleOneContainerText">
                                                                                            $29
                                                                                        </p>
                                                                                    </div>
                                                                                </div>

                                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleTwo">
                                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleTwoContainer">
                                                                                        <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivThreeContainerDivEleTwoContainerText">
                                                                                            one-time
                                                                                        </p>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFour">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFourContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFourContainerDiv">
                                                                            <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFourContainerDivText">
                                                                                Normal price: $58
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFive">
                                                                    <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainer">
                                                                        <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainerDiv">
                                                                            <div className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainerDivEle">
                                                                                <p className="registerContainerDivLeftContainerDivThreeContainerDivTwoContainerDivElementContainerDivFiveContainerDivEleText">
                                                                                    Pay once, own it forever. All premium features, no recurring fees.
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="registerContainerDivLeftContainerDivFour">
                                <div className="registerContainerDivLeftContainerDivFourContainer">
                                    <div className="registerContainerDivLeftContainerDivFourContainerDiv">
                                        <div className="registerContainerDivLeftContainerDivFourContainerDivOne">
                                            <div className="registerContainerDivLeftContainerDivFourContainerDivOneContainer">
                                                <div className="registerContainerDivLeftContainerDivFourContainerDivOneContainerButton">
                                                    <div className="registerContainerDivLeftContainerDivFourContainerDivOneContainerButtonEle">
                                                        <p className="registerContainerDivLeftContainerDivFourContainerDivOneContainerButtonEleText">
                                                            Continue with {selectedPlan === 'weekly' ? 'Premium Weekly' : 'Premium Lifetime'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="registerContainerDivLeftContainerDivFourContainerDivTwo">
                                            <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainer">
                                                <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDiv">
                                                    <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivOne">
                                                        <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivOneContainer">
                                                            <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivOneContainerDiv">
                                                                <p className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivOneContainerDivText">
                                                                    Already have an account?
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivTwo">
                                                        <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivTwoContainer">
                                                            <div className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivTwoContainerDiv">
                                                                <p className="registerContainerDivLeftContainerDivFourContainerDivTwoContainerDivTwoContainerDivText"
                                                                   onClick={() => setShowSignIn(true)}
                                                                   style={{ cursor: 'pointer' }}>
                                                                    Sign in
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Part */}
                <div className="registerContainerDivRight">
                    <div className="registerContainerDivRightContainer">
                        <div className="registerContainerDivRightContainerDiv">
                            {/* Top Part */}
                            <div className="registerContainerDivRightContainerDivTop">
                                <div className="registerContainerDivRightContainerDivTopContainer">
                                    <div className="registerContainerDivRightContainerDivTopContainerDiv">
                                        {/* Main Part */}
                                        <div className="registerContainerDivRightContainerDivTopContainerDivOne">
                                            <div className="registerContainerDivRightContainerDivTopContainerDivOneContainer">
                                                <div className="registerContainerDivRightContainerDivTopContainerDivOneContainerDiv">
                                                    <img src="https://www.getmockly.com/_next/image?url=%2Ftechcrunch-logo.png&w=128&q=75" alt="" className='registerContainerDivRightContainerDivTopContainerDivOneContainerDivImage' />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="registerContainerDivRightContainerDivTopContainerDivTwo">
                                            <div className="registerContainerDivRightContainerDivTopContainerDivTwoContainer">
                                                <div className="registerContainerDivRightContainerDivTopContainerDivTwoContainerDiv">
                                                    <p className="registerContainerDivRightContainerDivTopContainerDivTwoContainerDivText">
                                                        "Mockly made a fake DM generator that’s actually user-friendly"
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="registerContainerDivRightContainerDivTopContainerDivThree">
                                            <div className="registerContainerDivRightContainerDivTopContainerDivThreeContainer">
                                                <div className="registerContainerDivRightContainerDivTopContainerDivThreeContainerDiv">
                                                    <p className="registerContainerDivRightContainerDivTopContainerDivThreeContainerDivText">
                                                        — Featured in TechCrunch
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Bottom Part */}
                            <div className="registerContainerDivRightContainerDivBottom">
                                <div className="registerContainerDivRightContainerDivBottomContainer">
                                    <div className="registerContainerDivRightContainerDivBottomContainerDiv">
                                        {/* Top Part */}
                                        <div className="registerContainerDivRightContainerDivBottomContainerDivTop">
                                            <div className="registerContainerDivRightContainerDivBottomContainerDivTopContainer">
                                                <div className="registerContainerDivRightContainerDivBottomContainerDivTopContainerDiv">
                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivTopContainerDivText">
                                                        ✨ Premium includes
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Part */}
                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottom">
                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainer">
                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDiv">

                                                    {/* Element */}
                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElement">
                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainer">
                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDiv">
                                                                {/* Left Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeft">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOne">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainer">
                                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDiv">
                                                                                        <LuInfinity className='registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDivIcon' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwo">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainer">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainerText">
                                                                                        Unlimited exports
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Right Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRight">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButton">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEle">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEleText">
                                                                                        Coming soon
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>





                                                    {/* Element */}
                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElement">
                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainer">
                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDiv">
                                                                {/* Left Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeft">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOne">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainer">
                                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDiv">
                                                                                        <LuInfinity className='registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDivIcon' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwo">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainer">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainerText">
                                                                                        Unlimited exports
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Right Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRight">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButton">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEle">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEleText">
                                                                                        Coming soon
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>








                                                    {/* Element */}
                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElement">
                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainer">
                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDiv">
                                                                {/* Left Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeft">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOne">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainer">
                                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDiv">
                                                                                        <LuInfinity className='registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDivIcon' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwo">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainer">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainerText">
                                                                                        Unlimited exports
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Right Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRight">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButton">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEle">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEleText">
                                                                                        Coming soon
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>







                                                    {/* Element */}
                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElement">
                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainer">
                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDiv">
                                                                {/* Left Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeft">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOne">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainer">
                                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDiv">
                                                                                        <LuInfinity className='registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDivIcon' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwo">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainer">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainerText">
                                                                                        Unlimited exports
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Right Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRight">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButton">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEle">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEleText">
                                                                                        Coming soon
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>





                                                    {/* Element */}
                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElement">
                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainer">
                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDiv">
                                                                {/* Left Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeft">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOne">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainer">
                                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDiv">
                                                                                        <LuInfinity className='registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivOneContainerDivIcon' />
                                                                                    </div>
                                                                                </div>
                                                                            </div>

                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwo">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainer">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivLeftContainerDivTwoContainerText">
                                                                                        Unlimited exports
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                                {/* Right Part */}
                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRight">
                                                                    <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainer">
                                                                        <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDiv">
                                                                            <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButton">
                                                                                <div className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEle">
                                                                                    <p className="registerContainerDivRightContainerDivBottomContainerDivBottomContainerDivElementContainerDivRightContainerDivButtonEleText">
                                                                                        Coming soon
                                                                                    </p>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register