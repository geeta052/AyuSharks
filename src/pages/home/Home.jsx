import React, { useState, useContext, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import main_img from '../../assests/heroo-removebg-preview.png';
import hero from '../../assests/hero4.png';
function Home() {
   
  return ( 

  <div className="bg-gray-900">
    <header className="sticky top-0 z-50">
        <nav className="container flex text-white justify-between items-center">
            <div className="py-5 ml-8 text-color-secondary font-bold text-3xl">
                <a href="#home">
                    <span className="text-color-white">Ayu</span>Sharks
                </a>
            </div>
            <div>
                <ul className="hidden lg:flex  items-center space-x-6">
                    <li><Link to = {"/login"} className="bg-blue-400 px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">Login</Link></li>
                    <li><Link to = {"/signup"} className="bg-blue-400 px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">Signup</Link></li>
                </ul>
            </div>
        </nav>
    </header>
    
    <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
        <div className="container  py-20">
                <div className="flex flex-col text-white items-center z-20 md:flex-row">
                    <div className="text-center mb-12 md:text-left md:w-1/2 md:pr-10">
                        <h1 className="title text-3xl font-bold text-center mb-4">आयुष प्रतिभावानां वैश्विक सम्बन्ध<br/> उत्सर्ग, सहकारः, समृद्धि !
                            </h1>
                        <p className="leading-relaxed text-center mb-10">One-stop platform for all stakeholders in the AYUSH system to interact and collaborate.</p>
                        
                    </div>

                    <div className="md:w-1/2">
                        <img src={main_img} alt=""/>
                    </div>
                </div>
            </div>
        
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
          />
        </div>
      </div>
      {/* <div><Filters/></div> */}
      
      <section id="features" className="bg-color-primary-light text-white" >
            <div className="container py-20">
                <div className="text-center m-auto mb-20 md:w-1/2">
                    <h4 className="font-bold text-blue-400 mb-4 text-xl">Our Future</h4>
                    <h1 className="font-bold title text-4xl">Startup Toolkits & Facilities</h1>
                </div>

                <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 lg:gap-8 px-4 sm:px-6 lg:px-8">
                        <div className="border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer hover:bg-color-primary-dark ease-in duration-200">
                        <div className="bg-color-secondary inline-block rounded-2xl py-5 px-6">
                            <i className="fa-solid fa-calendar-days text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-bold py-4">IDEATION</h3>
                        <p className="leading-relaxed">Where the entrepreneur has an interesting idea and is working on bringing it to life.</p>
                    </div>

                
                    <div className="bg-color-primary-dark border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer">
                        <div className="bg-color-secondary inline-block rounded-2xl py-5 px-6">
                            <i className="fa-solid fa-chart-column text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-bold py-4">VALIDATION</h3>
                        <p className="leading-relaxed">Where the startup has been established and it is time to enter market to grasp the first ever set of customers.</p>
                    </div>

                        <div className="border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer hover:bg-color-primary-dark ease-in duration-200">
                        <div className="bg-color-secondary inline-block rounded-2xl py-5 px-6">
                            <i className="fa-solid fa-phone text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-bold py-4">EARLY TRACTION</h3>
                        <p className="leading-relaxed">Where the startup has established a mark with the first wave of customers and KPIs take an important place in the growth model.</p>
                    </div>

                    
                    <div className="bg-color-primary-dark border-2 border-solid border-color-gray text-center py-20 px-5 rounded-2xl cursor-pointer">
                        <div className="bg-color-secondary inline-block rounded-2xl py-5 px-6">
                            <i className="fa-solid fa-chart-column text-4xl"></i>
                        </div>
                        <h3 className="text-xl font-bold py-4">SCALING</h3>
                        <p className="leading-relaxed">Where the startup has successfully achieved the product-market-fit and crossed the valley of death; for the startup to expand/raise capital.</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="saving-money">
            <div className="container py-20 relative">
                <div className="blob1"></div>

                <div className="blob2"></div>
                
                <div className="flex flex-col text-white items-center justify-between md:flex-row">
                    <div className="mb-12 md:w-1/2">
                        <img src={hero} alt=""/>
                    </div>

                    <div className="text-center md:text-left md:w-1/2 md:ml-20">
                        <h1 className="title text-3xl font-bold mb-4">AyuSharks App</h1>
                        <p className="leading-relaxed mb-10">Best financing app ever in the world. Easy to use and very user friendly for mobile banking. You can control your card easily and send money some one just one click.</p>
                        <button className="btn px-9 py-3 bg-blue-400 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">DOWNLOAD</button>
                    </div>
                </div>
            </div>
        </section>
        <section id="how-it-works" className="bg-color-primary-light text-white">
            <div className="container py-20">
                <div className="text-center m-auto mb-20 md:w-1/2">
                    <h4 className="font-bold text-2xl text-blue-400 mb-4">How It Works</h4>
                    <h1 className="title font-bold text-4xl">Grow Up Your Connections</h1>
                </div>

                <div className="flex flex-col items-center justify-between space-y-6 md:flex-row md:space-y-0 md:space-x-6">
                    {/* <!-- card 1  --> */}
                    <div className="text-center cursor-pointer">
                        <div className="relative bg-color-primary-dark inline-block px-6 py-3 rounded-lg cursor-pointer hover:bg-color-secondary ease-in duration-200">
                            <p className="text-6xl lg:after:content-[''] lg:after:flex lg:after:absolute lg:after:top-4 lg:after:left-32 2xl:after:left-52 lg:after:bg-no-repeat lg:after:h-7 lg:after:w-52">1</p>
                        </div>
                        <h3 className="text-xl font-bold py-4">Install The App</h3>
                        <p className="leading-relaxed">We use an application designed a testing gnose to keep away</p>
                    </div>

                    {/* <!-- card 2  --> */}
                    <div className="text-center cursor-pointer">
                        <div classn="box border-solid border-blue-200 relative inline-block px-6 py-3 rounded-lg cursor-pointer bg-color-secondary">
                            <p className="text-6xl lg:after:content-[''] lg:after:flex lg:after:absolute lg:after:top-10 lg:after:left-32 2xl:after:left-52 lg:after:bg-no-repeat lg:after:h-7 lg:after:w-52">2</p>
                      
                        </div>
                        <h3 className="text-xl font-bold py-4">Setup Your Profile</h3>
                        <p className="leading-relaxed">We use an application designed a testing gnose to keep away</p>
                    </div>
                {/* <!-- card 3  --> */}
                    <div className="text-center cursor-pointer">
                        <div className="relative bg-color-primary-dark inline-block px-6 py-3 rounded-lg cursor-pointer hover:bg-color-secondary ease-in duration-200">
                            <p className="text-6xl">3</p>
                        </div>
                        <h3 className="text-xl font-bold py-4">Enjoy The Features!</h3>
                        <p className="leading-relaxed">We use an application designed a testing gnose to keep away</p>
                    </div>
                </div>
            </div>
        </section>
        <section id="contact">
            <div className="container py-20 text-white">
                <div className="text-center m-auto mb-20 md:w-1/2">
                    <h4 className="font-bold text-lg text-blue-400 mb-4">Have A Questation</h4>
                    <h1 className="title font-bold text-4xl">Get In Touch</h1>
                </div>


                <form>
                    <div className="w-full m-auto text-center md:w-2/3">
                        <div className="text-color-primary-dark grid gap-6 mb-6 md:grid-cols-2">
                            <input type="text" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary" placeholder="Name"/>

                <input type="email" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary" placeholder="Email"/>

                <input type="tel" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary" placeholder="Phone"/>

                <input type="text" className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary" placeholder="Company"/>
                        </div>


                        <textarea rows="4" className="text-color-primary-dark bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-3 focus:outline-none focus:border-color-secondary" placeholder="Message"></textarea>

                        <button className="btn mt-10 bg-blue-400 px-9 py-3 rounded-md capitalize font-bold hover:opacity-80 ease-in duration-200">Send Message</button>
                    </div>
                </form>
            </div>
        </section>

<section id="footer">
            <div className="bg-color-primary-dark relative text-white">
                <div className="container py-10">
                    <div className="grid gap-10 md:grid-cols-3 pb-10">
                        <div className="space-y-6">
                            <h4 className="font-bold text-lg">About App</h4>
                            {/* <!-- <p className="leading-relaxed">This Should Be Used To Tell A Story And Include Any Testimonials You Might Have About Your Product Or Service For Your Clients</p> --> */}
                            <div className="flex gap-5 items-center">
                                <p>Follow Us</p>
                                    <i className="fa-brands fa-facebook-f cursor-pointer hover:text-color-secondary"></i>
                                    <i className="fa-brands fa-twitter cursor-pointer hover:text-color-secondary"></i>
                                    <i className="fa-brands fa-youtube cursor-pointer hover:text-color-secondary"></i>
                                    <i className="fa-brands fa-instagram cursor-pointer hover:text-color-secondary"></i>
                            </div>
                        </div>
                        <div className="flex justify-between md:justify-around">
                            <div className="space-y-6">
                                <h4 className="font-bold text-lg">Quick Links</h4>
                                <ul className="space-y-3">
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#">Home</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#features">Features</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#testimonial">Testimonial</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#pricing">Pricing</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#blog">Blog</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#contact">Contact</a></li>

                                </ul>
                            </div>

                            <div className="space-y-6">
                                <h4 className="font-bold text-lg">Help</h4>
                                <ul className="space-y-3">
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#">About Us</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#features">Partners</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#testimonial">Career</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#pricing">Reviews</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#blog">Terms & Conditions</a></li>
                                    <li className="underline hover:no-underline hover:text-color-secondary"><a href="#contact">Help</a></li>

                                </ul>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-bold text-lg">Newsletter</h4>
                            <p className="leading-relaxed">Subscribe With Email And Loads Of News Will Be Sent To You</p>
                            <div className="flex items-center">
                                <input type="text" className="w-3/4 text-color-gray bg-color-white p-2 lg:p-3 rounded-l-md focus:outline-none" placeholder="Enter Your Email"/>
                                
                                <button type="submit" className="bg-color-secondary px-4 py-2 lg:px-5 lg:py-3 rounded-r-md hover:opacity-90">
                                    <i className="fa-solid fa-chevron-right"></i>
                                </button>
                            </div>
                        </div>
                    </div>


                    <div className="flex justify-center pt-10 border-t border-color-gray">
                        <p>2023 &copy; AyuSharks. All Rights Reserved.</p>
                    </div>
                </div>
            </div>
        </section>




      </div>

  )
}

export default Home