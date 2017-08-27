import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const HomeSubContent = () => {
  return (
    <div>
      <section className="bg-primary" >

 <div className="container">
   <div className="container-inner">
     <div className="row">
         <div className="col-xs-12 col-sm-4 ">
             <h3 className="margin-top-0 text-dark">Detailed reporting and data</h3>
             <br/>
             <p className="home-left-col-p">
               We'll report back on every aspect of your website that matters, and save each set of results to your dashboard for easy reference. We’ll even suggest fixes to common problems.

               We've got you covered.
             </p>
             <a href="#three" className="btn btn-danger btn-lg ">Learn More</a>
         </div>
         <div className="col-xs-12 col-sm-8">
           <div className="row">
             <img src="images/realtime.png" width="524" height="474" className="img-responsive home-right-col-img" />
           </div>

         </div>
     </div>
     <div className="space-md"></div>
       <div className="row">

         <div className="col-xs-12 col-sm-8">
           <div className="row">
             <img src="images/reporting.png" width="524" height="474" className="img-responsive home-right-col-img" />
           </div>

         </div>

           <div className="col-xs-12 col-sm-4 ">
               <h3 className="margin-top-0 text-dark">Real-time site monitoring and alerts</h3>
               <br/>
               <p className="home-left-col-p">
                 Start off with our free package, or let us monitor your website with an automated daily scan. Passmarked will notify you of any critical errors, security bugs, or when emerging standards have made an impact on your website score.

                 How’s that for peace of mind?
               </p>
               <a href="#three" className="btn btn-danger btn-lg ">VIEW OUR PACKAGES</a>
           </div>

       </div>
 </div>
 </div>


     <div className="space-md"></div>


     </section>
    </div>
  )
}

export default HomeSubContent
