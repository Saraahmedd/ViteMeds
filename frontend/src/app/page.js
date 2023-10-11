"use client"
import Head from 'next/head';
import Image from 'next/image';
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'

const LandingPage = () => {
  return (
    <div>
      <Head>
        <meta charSet="UTF-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>XPharmacies</title>
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
      </Head>
      <Navbar/>

      {/* Pharmacy Name and Image Section */}
      <section className="container m-5 p-5">
        <div className="row pb-5">
          <div className="col-md-9 slide-top">
            <h1 className='text-size-200 text-primary'>XPharmacies</h1>
            <h2>
              Speedy medicine delivery at your
              fingertips.
            </h2>
          </div>
          <div className="col-md-3 slide-top">
          <Image src='/pharmacy.jpg' height={275} width={400} className='rounded'/>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id='about' className="bg-light py-5">
        <div className="container py-5">
          <div className="row align-items-center">
            <div className="col-md-6">
            <Image src='/medicine-package.jpg' height={281} width={500} className='rounded shadow'/>
            </div>
            <div className='col-md-6'>
            <h2 className='text-primary pb-3'><strong>About Us</strong></h2>
            <div className="bg-light card border-0 shadow " >
              <div className="card-body">
              <h5 className="card-title text-primary">XPharmacies</h5>
              <p className="card-text">
              At XPharmacies, we are more than just a pharmacy; we are your <strong>trusted healthcare partner</strong>. 
              With a commitment to your well-being, our experienced pharmacists and dedicated staff are here to provide personalized care and support. 
              Our mission is to ensure your access to <strong>essential medications, health information, and a friendly, convenient experience.</strong> 
              </p>
            </div>
            </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="bg-primary p-5">
        <h2 className='text-light pb-3 text-center'>
          <strong>Our Services</strong>
        </h2>
        <div className='cotainer'>
        <div className="row">
            <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/diagnosis.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
                Online platform</h5>
              <h6 className="card-subtitle mb-2 text-muted">Hate the pharmacy commute? We've got you!</h6>
              <p className="card-text">Say goodbye to unnecessary trips to the pharmacy, with XPharmacies you can now buy all the medicine you want at the touch of a button!</p>
            </div>
            </div>
            <br />
            </div>
            <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/scooter.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
              Speedy Delivery!</h5>
              <h6 className="card-subtitle mb-2 text-muted">Got a time-sensitive medical emergency?</h6>
              <p className="card-text">Our couriers are available 24/7 to accomodate for yur medical needs and deliver them to your doorstep in no time!</p>
            </div>
            </div>
            <br />
            </div>
        </div>
        <div className="row">
        <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/details.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
              Medication Information</h5>
              <h6 className="card-subtitle mb-2 text-muted">Need info on a specific product?</h6>
              <p className="card-text">No more guessing! Get a your medication info from the proffessionals, with the help of our fully-descriptive product platform!</p>
            </div>
            </div>
            <br />
            </div>
            <div className="col-md-6">
            <div className="card relative-div" >
              <div className="card-body">
              <Image src='/medication.svg' height={45} width={45} className='absolute-icon rounded-circle bg-white shadow'/>
              <h5 className="card-title text-primary ms-4 ps-1">
              Automatic Refills</h5>
              <h6 className="card-subtitle mb-2 text-muted">Need frequent refills? Your health is our top priority!</h6>
              <p className="card-text">Chronical illnesses made a easier with our scheduled automatic medicication refill services.</p>
            </div>
            </div>
            <br />
            </div>
        </div>
        </div>
      </section>

      {/* Testimonial Section (with Bootstrap Carousel) */}
      <section className="bg-light py-5">
      <div className="container">
        <h2 className="text-center text-primary pb-4">
          <strong>Testimonials</strong>
        </h2>
        <div className="row">
          <div className="col-md-8 mx-auto ">
            <div id="testimonialCarousel" className="carousel slide" data-ride="carousel">
              <ul className="carousel-indicators d-flex flex-row justify-content-center align-items-center text-center me-auto">
                <li className="active col-md-1 align-self-center" data-target="#testimonialCarousel" data-slide-to="0"></li>
                <li className="col-md-1 align-self-center" data-target="#testimonialCarousel" data-slide-to="1"></li>
                <li className="col-md-1 align-self-center" data-target="#testimonialCarousel" data-slide-to="2"></li>
              </ul>
              <div className="carousel-inner">
                <div className="carousel-item card-height active">
                  <div className="card border-0 shadow p-5 relative-div mt-5">
                    <div className="card-body mx-4 ">
                  <Image src='/John-Doe.jpg' height={100} width={100} className='absolute-testimonial-image rounded-circle bg-white shadow'/>
                      <h5 className="card-title text-primary">
                        <strong>John Doe</strong>
                      </h5>
                      <p className="card-subtitle">Happy Patient</p>
                      <hr className='w-75'/>
                      <p className="card-text">
                      "XPharmacies has made healthcare so convenient. I can now buy my medicine from the comfort of my screen, no calls required. It's a game-changer!"                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item card-height">
                  <div className="card border-0 shadow p-5 relative-div mt-5">
                    <div className="card-body mx-4">
                    <Image src='/Jane-Smith.jpg' height={100} width={100} className='absolute-testimonial-image rounded-circle bg-white shadow'/>
                      <h5 className="card-title text-primary">
                        <strong>Jane Smith</strong>
                      </h5>
                      <p className="card-subtitle">Satisfied Patient</p>
                      <hr className='w-75'/>
                      <p className="card-text">
                      "As a mother of three, XPharmacies has saved me so much stress!! No more worrying about my kids' symptoms, 
                      i can just order the necessary medication in the matter of seconds. Made my life a whole lot easier, I highly recommend it."                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-item card-height">
                  <div className="card border-0 shadow p-5 relative-div mt-5">
                    <div className="card-body mx-4">
                    <Image src='/David-Johnson.jpg' height={100} width={100} className='absolute-testimonial-image rounded-circle bg-white shadow'/>
                      <h5 className="card-title text-primary">
                        <strong>David Johnson</strong>
                      </h5>
                      <p className="card-subtitle text-muted">Another Happy Patient</p>
                      <hr className='w-75'/>
                      <p className="card-text">
                      "I was skeptical about automatic refills, but the staff at XPharmacies have been incredibly consistent and fast. No more need to manually order refills a week before."                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <a className="carousel-control-prev" href="#testimonialCarousel" role="button" data-slide="prev">
                <span className="carousel-control-prev-icon bg-primary rounded-circle" aria-hidden="true"></span>
              </a>
              <a className="carousel-control-next" href="#testimonialCarousel" role="button" data-slide="next">
                <span className="carousel-control-next-icon bg-primary rounded-circle" aria-hidden="true"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

      {/* Statistics Section */}
      <section className="container p-5 ">
      <h2 className="text-center py-3"><strong>Get to know our success, but in numbers..</strong></h2>
      <hr className='w-75 mx-auto'/>
      <div className="row pb-3 my-5">
        <div className="col-md-3 d-flex align-items-center justify-content-center mx-auto">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>5000+</h2>
            <h4>Happy Customers</h4>
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center mx-auto mt-5">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>400+</h2>
            <h4>Specialized Pharmacists</h4>
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-center justify-content-center mx-auto">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>30+</h2>
            <h4>Affiliate Pharmacies</h4>
          </div>
        </div>
        <div className="col-md-3 d-flex align-items-start justify-content-center mx-auto mt-5">
          <div className="statistic shape-background rounded shadow text-center">
            <h2>20+</h2>
            <h4>Partner Countries</h4>
          </div>
        </div>
      </div>
    </section>


      {/* Sign Up Section */}
      <section className="bg-light py-5" >
        <div className="container text-center">
          <h2 className='py-3'>
            <strong>
            Sign up and never worry about your
            medication again!
            </strong>
          </h2>
            <div className="">
              <a
              href="/guest/Register"
              className="btn btn-primary text-light mt-3 p-3 px-4">
              <strong>Sign Up Now</strong>
              </a>
            </div>
        </div>
      </section>
      <Footer/>
      {/* Add Bootstrap JavaScript and jQuery links */}
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.3/dist/umd/popper.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </div>
  );
};

export default LandingPage;
