import React from 'react';
import './signIn.css';

const SignIn = () => {
  return (
    <div className='signIn'>
        <div className="signInContainer">
            <div className="signInContainerDiv">
                {/* Top Part */}
                <div className="signInContainerDivTop">
                    <div className="signInContainerDivTopContainer">
                        <div className="signInContainerDivTopContainerDiv">
                            <div className="signInContainerDivTopContainerDivOne">
                                <div className="signInContainerDivTopContainerDivOneContainer">
                                    <p className="signInContainerDivTopContainerDivOneContainerText">
                                        Sign in
                                    </p>
                                </div>
                            </div>

                            <div className="signInContainerDivTopContainerDivTwo">
                                <div className="signInContainerDivTopContainerDivTwoContainer">
                                    <p className="signInContainerDivTopContainerDivTwoContainerText">
                                        Enter your email and password to sign in to your account
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Middle Part */}
                <div className="signInContainerDivMiddle">
                    <div className="signInContainerDivMiddleContainer">
                        <div className="signInContainerDivMiddleContainerDiv">
                            <div className="signInContainerDivMiddleContainerDivOne">
                                <div className="signInContainerDivMiddleContainerDivOneContainer">
                                    <div className="signInContainerDivMiddleContainerDivOneContainerDiv">
                                        <div className="signInContainerDivMiddleContainerDivOneContainerDivOne">
                                            <div className="signInContainerDivMiddleContainerDivOneContainerDivOneContainer">
                                                <p className="signInContainerDivMiddleContainerDivOneContainerDivOneContainerText">
                                                    Email
                                                </p>
                                            </div>
                                        </div>

                                        <div className="signInContainerDivMiddleContainerDivOneContainerDivTwo">
                                            <div className="signInContainerDivMiddleContainerDivOneContainerDivTwoContainer">
                                                <input type="text" className='signInContainerDivMiddleContainerDivOneContainerDivTwoContainerInput' placeholder='Enter your email' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="signInContainerDivMiddleContainerDivTwo">
                                <div className="signInContainerDivMiddleContainerDivTwoContainer">
                                    <div className="signInContainerDivMiddleContainerDivTwoContainerDiv">
                                        <div className="signInContainerDivMiddleContainerDivTwoContainerDivOne">
                                            <div className="signInContainerDivMiddleContainerDivTwoContainerDivOneContainer">
                                                <p className="signInContainerDivMiddleContainerDivTwoContainerDivOneContainerText">
                                                    Password
                                                </p>
                                            </div>
                                        </div>

                                        <div className="signInContainerDivMiddleContainerDivTwoContainerDivTwo">
                                            <div className="signInContainerDivMiddleContainerDivTwoContainerDivTwoContainer">
                                                <input type="text" className='signInContainerDivMiddleContainerDivTwoContainerDivTwoContainerInput' placeholder='Enter your password' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Part */}
                <div className="signInContainerDivBottom">
                    <div className="signInContainerDivBottomContainer">
                        <div className="signInContainerDivBottomContainerDiv">
                            <div className="signInContainerDivBottomContainerDivOne">
                                <div className="signInContainerDivBottomContainerDivOneContainer">
                                    <div className="signInContainerDivBottomContainerDivOneContainerDiv">
                                        {/* Button */}
                                        <div className="signInContainerDivBottomContainerDivOneContainerDivButton">
                                            <div className="signInContainerDivBottomContainerDivOneContainerDivButtonContainer">
                                                <p className="signInContainerDivBottomContainerDivOneContainerDivButtonContainerText">
                                                    Sign in
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="signInContainerDivBottomContainerDivTwo">
                                <div className="signInContainerDivBottomContainerDivTwoContainer">
                                    <div className="signInContainerDivBottomContainerDivTwoContainerDiv">
                                        <div className="signInContainerDivBottomContainerDivTwoContainerDivOne">
                                            <div className="signInContainerDivBottomContainerDivTwoContainerDivOneContainer">
                                                <p className="signInContainerDivBottomContainerDivTwoContainerDivOneContainerText">
                                                    Don't have an account?
                                                </p>
                                            </div>
                                        </div>

                                        <div className="signInContainerDivBottomContainerDivTwoContainerDivTwo">
                                            <div className="signInContainerDivBottomContainerDivTwoContainerDivTwoContainer">
                                                <p className="signInContainerDivBottomContainerDivTwoContainerDivTwoContainerText">
                                                    Sign up
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
  )
}

export default SignIn