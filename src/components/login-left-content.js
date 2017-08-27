import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const LoginLeftContent = () => {
  return (
    <div>
      <div className="col-xs-12 col-md-6 ">
          <div className="bg-cover">
          <div className="row">
              <div className=" signUp-inner-col-left">
                <p className="signUp-col-left-title">Welcome back <br/>
                to Seogram</p>

                <p className="signUp-col-left-p">
                  Seogram works best when you have an account, whether you are on a free or advanced option. It allows you to keep a dashboard with saved data of the sites you have run through the system, we’ll alert you about important updates and you get access to the Passmarked Slack forum.

                  If you are a developer and want to contribute, log in with Github. Everyone else can log in with their Google account.
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginLeftContent
