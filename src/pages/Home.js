import { NavLink } from "react-router-dom"
import { AiTwotoneFire } from 'react-icons/ai'
import { BsArrowRight, BsFillPersonCheckFill, } from 'react-icons/bs'
import { MdLibraryAddCheck, MdNotificationsActive } from 'react-icons/md'
import { TbListDetails } from 'react-icons/tb'
import { FaBox } from 'react-icons/fa'
import { TfiDropbox, TfiLayoutListThumbAlt, TfiWorld } from 'react-icons/tfi'
import curvedArrow from '../assets/curvedArrow.svg'
import swirledArrow from '../assets/swirledArrow.svg'

const Home = () => {
  return (
    <>

      <section className="hero">
        <div className="pattern pattern1">
          <div className="pattern-row gradient-row-top">
            <span className="last-left-cell" />
            <span />
            <span className="highlighted-cell" />
            <span />
            <span />
            <span />
            <span className="last-right-cell" />
          </div>
          <div className="pattern-row">
            <span className="last-left-cell" />
            <span className="highlighted-cell" />
            <span />
            <span />
            <span />
            <span />
            <span className="last-right-cell" />
          </div>
          <div className="pattern-row">
            <span className="last-left-cell" />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span className="last-right-cell" />
          </div>
          <div className="pattern-row gradient-row-bottom">
            <span className="last-left-cell" />
            <span />
            <span />
            <span />
            <span />
            <span className="highlighted-cell" />
            <span className="last-right-cell" />
          </div>
        </div>
        <div className="pattern pattern2">
          <div className="pattern-row gradient-row-top">
            <span className="last-left-cell" />
            <span />
            <span className="highlighted-cell" />
            <span />
            <span />
            <span />
            <span className="last-right-cell" />
          </div>
          <div className="pattern-row">
            <span className="last-left-cell" />
            <span className="highlighted-cell" />
            <span />
            <span />
            <span />
            <span />
            <span className="last-right-cell" />
          </div>
          <div className="pattern-row">
            <span className="last-left-cell" />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span className="last-right-cell" />
          </div>
          <div className="pattern-row gradient-row-bottom">
            <span className="last-left-cell" />
            <span />
            <span />
            <span />
            <span />
            <span className="highlighted-cell" />
            <span className="last-right-cell" />
          </div>
        </div>
        <div className="container">
          <div className="hero-left">
            <NavLink to='/register-donor' className="join-us-cta">
              <AiTwotoneFire />
              <p>Donate Now</p>
            </NavLink>

            <h1>
              Let's become
              <br />
              part of <span>something
                <br />
                bigger.
              </span>
            </h1>

            <div className="button-container">
              <NavLink to='/register-needy' className='button'>Join Now</NavLink>
              <NavLink to='/login' className='login-cta-button'>
                <div>
                  Already a member
                  <BsArrowRight />
                </div>
                <span></span>
              </NavLink>
            </div>
          </div>
          <div className="hero-right">
            <img src='./2.avif' alt='hero image' />
          </div>
        </div>
      </section>

      <section className="home-stats">
        <div className="container">
          <TfiWorld />
          <div className="home-stats-list">
            <div className="home-stat">
              <h3 className="home-stat-value">20k</h3>
              <p className="home-stat-desc">More than 20k donors are currently joined with us 😃</p>
            </div>
            <span className="divider" />
            <div className="home-stat">
              <h3 className="home-stat-value">30,00</h3>
              <p className="home-stat-desc">Almost 30,000 donors are getting donations from SevaX 🎉</p>
            </div>
            <span className="divider" />
            <div className="home-stat">
              <h3 className="home-stat-value">10M</h3>
              <p className="home-stat-desc">10M items donated to various donors 🤩</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container donation-steps">
        <div className="donation-steps-top">
          <div className="step-left">
            <h1>
              More people
              <br />
              More impact
            </h1>
            {/* <NavLink to='/register-donor' className="join-us-cta">
              <AiTwotoneFire />
              <p>Donate Now</p>
            </NavLink> */}
          </div>
          <div className="step-right">
            <p>Together, we can make a significant impact on the lives of those in need. By joining our community of donors, you can play a crucial role in bringing positive change to the world. </p>
          </div>
        </div>

        <div className="donation-steps-bottom mt-5 pb-5" >
          <div className="donation-step left">
            <div className="step-main">
              <TfiLayoutListThumbAlt style={{ fill: '#004162' }} />
              <h2>Join us as donor and list your item on our platform</h2>
            </div>
            <div className="step-arrow">
              {/* <img src={swirledArrow} alt="swirled arrow" /> */}
            </div>
          </div>

          <div className="donation-step right">
            <div className="step-arrow">
              {/* <img src={curvedArrow} alt="swirled arrow" /> */}
            </div>
            <div className="step-main">
              <MdLibraryAddCheck style={{ fill: '#f9c800' }} />
              <h2>Needy will be able to see your item and send you requests for getting that item for donation</h2>
            </div>
          </div>

          <div className="donation-step left">
            <div className="step-main">
              <BsFillPersonCheckFill style={{ fill: '#6c6c6c' }} />
              <h2>You can select a needy from the list of requests which will give the selected needy a secret code and your selected pickup location.</h2>
            </div>
            <div className="step-arrow">
              {/* <img src={swirledArrow} alt="swirled arrow" /> */}
            </div>
          </div>

          <div className="donation-step right">
            <div className="step-arrow">
              {/* <img src={curvedArrow} alt="swirled arrow" /> */}
            </div>
            <div className="step-main">
              <MdNotificationsActive style={{ fill: '#ff5b85' }} />
              <h2>Needy will receive the secret code and will come to your selected pickup location for getting the donatioin item(s).</h2>
            </div>
          </div>

          <div className="donation-step left">
            <div className="step-main">
              <FaBox style={{ fill: '#00b967' }} />
              <h2>On successfull verification of secret code the item will be donated to that needy.</h2>
              <NavLink to='/register-donor' className="join-us-cta">
                <AiTwotoneFire />
                <p>Donate Now</p>
              </NavLink>
            </div>
            <div className="step-arrow">
              {/* <img src={swirledArrow} alt="swirled arrow" /> */}
            </div>
          </div>

        </div>

      </section>
    </>
  )
}

export default Home