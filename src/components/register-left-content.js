import React, { PropTypes } from 'react'
import { Link } from 'react-router';

const RegisterLeftContent = () => {
  return (
    <div>
      <div className="col-xs-12 col-md-6 ">
          <aside className="bg-cover">
          <div className="row">
              <div className=" signUp-inner-col-left">
                <p className="signUp-col-left-title">Get started with  <br/>
                a free account.</p>

              <div className="space-sm"></div>
                <ul className="signUp-col-left-p">
              <li>
                You will receive 300 credits monthly on the free plan, which allow you to test 300 pages individually or on a checked website
              </li>
              <li>
                You will be able to recursively check 2 websites manually
              </li>
              <li>
                You will be subscribed to our mailing list for news on any new important updates
              </li>
              <li>
                User accounts can be deleted anytime if we are not for you
              </li>
                </ul>
              </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default RegisterLeftContent
