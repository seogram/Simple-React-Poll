import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const ForgotLeftContent = () => {
  return (
    <div>
      <div className="col-xs-12 col-md-6 ">
          <div className="bg-cover">
          <div className="row">
              <div className=" signUp-inner-col-left">
                <p className="signUp-col-left-title">Forgot your <br/>
                password?</p>

                <p className="signUp-col-left-p">
                No worries, happens to the best of us. Complete the form on the right and we will send a "magic link" that will allow you to reset and access your account again.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotLeftContent
