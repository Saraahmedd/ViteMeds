"use client"
import Image from "next/image";
import { useState } from 'react';
import landinganim from '../../../public/landingAnim.json' ;
import Lottie from "lottie-react";
import { Button, Col, Grid,  Card} from "@tremor/react";
import NumberCounter from '@/components/NumberCounter';


    

const PharmacyLandingPage = () => {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const testimonials = [
    {
      title: "Streamlined Healthcare Journey",
      content: "The collaboration between this online pharmacy and the online clinic has made my healthcare journey incredibly smooth. From consultation to prescription and medication delivery, everything is integrated. It's a one-stop solution that has simplified the entire process, making it easy and convenient for someone always on the go."
    },
    {
      title: "Reliable Medications",
      content: 'I have been using this online pharmacy for years, and I must say it is the most reliable one I have encountered. The medications are genuine, and the delivery is always on time. I highly recommend it to anyone in need of trustworthy healthcare services.',
    },
    
    
  ];

  const handlePrev = () => {
    setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1));
  };

  const handleNext = () => {
    setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0));
  };

  return (
    <>
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <div className="m-0 sm:m-10 shadow sm:rounded-lg flex flex-col lg:flex-row gap-x-4">
          <div className="lg:w-full xl:w-full p-6 sm:p-12 transform scale-70">
           
            <Grid numItems={4} className="gap-x-3 gap-y-4">
                <Col numColSpan={2}  className="flex items-center">
            
              <div className="w-full justify-center items-center flex-1 mt-8">
              <h1 className="text-4xl xl:text-5xl font-extrabold text-left tracking-wide leading-relaxed mb-5 mt-5">The Best Pharmacy For You and Your Family</h1>
                <div className="mx-auto max-w-l">
                  <h2 className="text-left text-2xl leading-relaxed mb-8">
                  Your Wellness, Our Priority.
                  </h2> 
                  
                  
                  <Button
                  variant="primary"
                  size="xl"  // Adjusted to a larger size
                  className="mt-3 tracking-wide font-semibold text-4xl px-9 py-3 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                >
                  Sign Up Now
                </Button>
                  </div>
                </div>
             
              </Col>

              <Col numColSpan={2} >
              <div className="lg:w-1/3 xl:w-1/3 h-full">
            <Lottie animationData={landinganim} className="w-[800px] h-[700px]" loop={true} />
          </div>
              </Col>

            
              <Col numColSpan={4}>
              <div className="flex justify-center mb-3">
    <p className="text-center text-xl">
      Powered by  <span className="text-extrabold text-4xl"> Vite Clinics.</span>
    </p>
  </div>
</Col>
<Col numColSpan={4}>
  
      


<Card className="p-8 rounded-lg  hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer dark">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
    {/* Left Column - One Big Element */}
    
    <div className="mb-8 mt-5 flex justify-center  flex-col md:col-span-1">
  <h1 className="text-3xl  font-extrabold leading-relaxed mb-2">
    "Caring for Your Well-being"
  </h1>
  <h3 className="text-lg font-semibold leading-relaxed mb-2">
    Your health is our top priority. We adhere to stringent security and compliance standards to ensure the safety and well-being of you and your loved ones.
  </h3>
</div>

{/* justify-center */}

    {/* Right Column - Grid with Two Rows and Two Columns */}
    <div className="md:col-span-1 grid grid-cols-2 gap-8">
      {/* Row 1 */}
      <div className="mb-8 flex items-center justify-center flex-col md:col-span-1">
      <Image src="/orderBag.svg" height={60} width={60} alt="Order Bag" />
      <NumberCounter end={50000} duration={3000} />
       <h2 className="text-xl  font-extrabold leading-relaxed mb-2">Orders Completed</h2>
      </div>
      

      <div className="mb-8 mt-5 flex items-center justify-center flex-col">
        <Image src="/clients.svg" height={40} width={40} alt="Clients" />
        <NumberCounter end={30000} duration={2500} />
        <h2 className="text-xl  font-extrabold leading-relaxed mb-2">Satisfied Customers</h2>
      </div>

      {/* Row 2 */}
      <div className="mb-8 flex items-center justify-center flex-col">
        <Image src="/calendar.svg" height={40} width={40} alt="Calendar" />
        <div className="flex items-center">
        <NumberCounter end={10} duration={2000} />
        <span className="text-4xl  font-extrabold mt-6">+</span>
        </div>
        <h2 className="text-xl  font-extrabold leading-relaxed mb-2">Years of Experience</h2>
      </div>

      <div className="mb-8 flex items-center justify-center flex-col">
        <Image src="/smiley.svg" height={50} width={50} alt="Clients" />
        <div className="flex items-center">
    <NumberCounter end={98} duration={2500} />
      <span className="text-4xl  font-extrabold mt-6">%</span>
    </div>
        <h2 className="text-xl  font-extrabold leading-relaxed mb-2">Positive Feedback</h2>
      </div>
    </div>
  </div>
</Card>

</Col>




              
            <Col numColSpan={2} >
    {/* Card 1 */}
    <Card className="p-8 rounded-lg hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer dark mt-7">
  <div className="grid grid-cols-2 gap-8">
    <div>
      <h2 className="text-2xl  font-semibold mb-5  ml-3 mr-15">EXCLUSIVE OFFERS FOR VITE CLINIC HEALTH PACKAGE SUBSCRIBERS</h2>


    </div>
    <div className="flex items-center justify-end">
    <Image
      
      src="/percentage.png"
      alt="Card Image"
      layout="fill"
      objectFit="contain"
      className="w-3xl h-3xl ml-40"
     
    />
    </div>
  </div>
</Card>





    </Col>
    

    <Col numColSpan={2} >

    {/* Card 2 */}
    <Card className="p-8 rounded-lg py-10 hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer  mt-7  bg-opacity-0">
  <div className="grid grid-cols-2 gap-8">
    <div>
      <h1 className="text-3xl  font-semibold mb-2  ml-3 mr-15">Medication within minutes</h1>
      <h4 className="text-xl 700 font-semibold   ml-3 mr-15">There for you,  365 days a year</h4>


    </div>
    <div className="flex items-center justify-end">
    <Image
      
      src="/delivery.png"
      alt="Card Image"
      layout="fill"
      objectFit="contain"
      className="w-5xl h-5xl ml-40"
      
     
    />
    </div>
  </div>
</Card>

    </Col>

    <Col numColSpan={4} >

       {/* Testimonial Section */}
      {/* Use Tremor Carousel or equivalent component */}
      {/* ... */}
      <section className=" container mx-auto p-5" id='testimonials'>
        <h5 className="text-center pt-10 pb-2 text-blue-500 font-semibold">A GOOD WORD MEANS A LOT</h5>
        <h1 className="text-center text-gray-100 font-bold"             
        style={{
          fontSize: "3rem",
          fontWeight: "650",}}>Client Testimonials</h1>
        <h5 className="text-center pb-2 text-blue-200 font-medium">Find out what our loyal patients have to say about Vite Clinics...</h5>
        <div className="flex flex-wrap pb-3 my-5">
        <div class="container mx-auto px-6 py-10">
        <div class="flex flex-wrap justify-center">

        <div className="w-full md:w-1/3 p-4 pt-0">
          <div className="flex flex-col items-center rounded-lg hover:scale-105 border border-blue-500 shadow-md hover:bg-[#1e2638]">
            <Image src='/person7.png' height={400} width={400} className='mx-auto my-5'/>
            <div className="p-4">
              <h5 className="text-xl font-bold text-blue-500 mb-2 text-center">Jane Smith</h5>
              <p className="text-gray-100 mb-3">"The collaboration between Vite Clinic and Pharmacyc has made my healthcare journey incredibly smooth. From consultation to prescription and medication delivery. It's a one-stop solution that has made it easy and convenient for me and my family." </p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 pt-0">
          <div className="flex flex-col items-center rounded-lg hover:scale-105 border border-blue-500 shadow-md hover:bg-[#1e2638]">
            <Image src='/person8.png' height={200} width={192} className='mx-auto my-5'/>
            <div className="p-4">
            <h5 className="text-xl font-bold text-blue-500 mb-2 text-center">David Johnson</h5>
              <p className="text-gray-100 mb-3">"Ordering my medications online has never been easier. The website is user-friendly, and the ordering process is straightforward. Plus, the delivery is quick, making it a convenient option for anyone with a busy schedule. I appreciate the efficiency and simplicity."</p>
            </div>
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4 pt-0">
          <div className="flex flex-col items-center rounded-lg hover:scale-105 border border-blue-500 shadow-md hover:bg-[#1e2638]">
            <Image src='/person9.png' height={400} width={400} className='mx-auto my-5'/>
            <div className="p-4">
            <h5 className="text-xl font-bold text-blue-500 mb-2 text-center">John Doe</h5>
              <p className="text-gray-100 mb-3">"I have been using this Vite online services for years, and I must say it is the most reliable one I have encountered. The medications are genuine, and the delivery is always on time. I highly recommend it to anyone in need of trustworthy healthcare services."</p>
            </div>
          </div>
        </div>
        </div>
        </div>
        </div>
      </section>
    {/* <Card className="p-8 rounded-lg  hover:shadow-lg transition-all duration-300 ease-in-out cursor-pointer dark relative mt-5">
    <h1 className="text-4xl  font-extrabold mb-8  ml-3 mr-15">Testimonials</h1>
  <div id="default-carousel" className="relative w-full" data-carousel="slide">
    <div className="top-1/2 flex items-center justify-center h-full">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`${
              index === activeTestimonial ? 'block' : 'hidden'
            } duration-700 ease-in-out`}
            data-carousel-item
          >
            <div className="flex items-center justify-center text-center h-full">
           <div className=" p-6  text-center">
             <h3 className="text-2xl text-rose-700 font-semibold mb-2">{testimonial.title}</h3>
             <p className="">{testimonial.content}</p>
           </div>
</div>

          </div>
        ))}
      </div>
    </div>
    <div className="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse">
      {testimonials.map((_, index) => (
        <button
          key={index}
          type="button"
          className={`w-3 h-3 rounded-full ${
            index === activeTestimonial ? 'bg-gray-700' : 'bg-white'
          }`}
          aria-current={index === activeTestimonial ? 'true' : 'false'}
          aria-label={`Slide ${index + 1}`}
          onClick={() => setActiveTestimonial(index)}
        ></button>
      ))}
    </div>
    <button
      type="button"
      className="absolute top-1/2 start-0 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800/30 group focus:outline-none transform -translate-y-1/2"
      data-carousel-prev
      onClick={handlePrev}
    >
      <span className="text-3xl text-gray-700 dark:text-white" aria-hidden="true">
        {'<'}
      </span>
      <span className="sr-only">Previous</span>
    </button>
    <button
      type="button"
      className="absolute top-1/2 end-0 z-30 flex items-center justify-center h-10 w-10 rounded-full bg-white dark:bg-gray-800/30 group focus:outline-none transform -translate-y-1/2"
      data-carousel-next
      onClick={handleNext}
    >
      <span className="text-3xl text-gray-700 dark:text-white" aria-hidden="true">
        {'>'}
      </span>
      <span className="sr-only">Next</span>
    </button>
  </div>
</Card> */}


    </Col>


    
   
               
              </Grid> 

           
          </div>
          
        </div>
      </div>
    </>
  );
};

export default PharmacyLandingPage;


