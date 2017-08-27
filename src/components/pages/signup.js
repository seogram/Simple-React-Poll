
  import React from 'react';
  import {connect} from 'react-redux';
  import { Link } from 'react-router';
  import {bindActionCreators} from 'redux';
  import {findDOMNode} from 'react-dom';
  import {signup} from '../../actions/auth';
  import RegisteLeftContent from '../register-left-content';

class Signup extends React.Component{


  constructor(props) {
          super(props);
          this.state = {
              email : '',
              password : '',
              confirmPassword : '',
              errors: {},
              isLoading: false,
            ServerAuthError : ''
          }
          this.handleChange = this.handleChange.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
      }

      componentWillReceiveProps(newProps) {
        if (newProps.ServerAuthError) {
          this.setState({ServerAuthError:newProps.ServerAuthError});
        }
      }


  handleSubmit(e){
    e.preventDefault();
    this.setState({errors : {}});
    let isValid = false;
    let email = this.state.email,
        password = this.state.password,
        confirmPassword = this.state.confirmPassword;
        if (!email){
          this.setState({errors : {emailRequired : 'this field is required'}});
          isValid : false;
        }else if (!password){
          this.setState({errors : {PasswordRequired : 'this field is required'}});
          isValid : false;
        }else if (!confirmPassword){
          this.setState({errors : {ConfirmPasswordRequired : 'this field is required'}});
          isValid : false;
        }else if (password !==confirmPassword) {
          this.setState({errors:{confirmPassword : 'Password must be matched'}});
          isValid : false;
        }else {
          isValid = true;
        }

    if (isValid) {

      this.setState({ errors: {}, isLoading: true ,ServerAuthError : ''});
      let newUser = {email : this.state.email , password : this.state.password}
      this.props.signup(newUser);
    }else {
    }
  }



    // getValidationState(urlField) {
    //   switch(urlField){
    //   case 'url' :
    //     var url = this.state.url;
    //     if (url == ''){
    //       return null
    //     }
    //     else if (!this.state.urlValid && url.length > 0) {
    //     return 'warning';
    //   }else  {
    //       return 'success';
    //     }
    //     break;
    //     case 'strategy' :
    //     var strategy = this.state.strategy;
    //     if(strategy == ''){
    //       return 'warning';
    //     }
    //     else if (strategy.length >0){
    //       return 'success'
    //     }
    //      default :
    //     break;
    //   }
    //   }

    handleChange(e) {
      this.setState({
      [e.target.name] : e.target.value,

       });
     }


render(){


return(
  <div>
    <div className="container-fluid">

              <div className="row">

                  <RegisteLeftContent />

                  <div className="col-xs-12 col-md-6 ">
                      <div className="row" >
                      <div className="signUp-inner-col-right">

                          <p className="signUp-col-right-title">ALready have an account? <Link to ="/signin" className="text-dark"> Login</Link></p>
                          <button type="button" className="btn btn-default-dark btn-lg btn-block "><span>
                          <img className="signUp-ico" src="images/github.png" />
                          </span>Login with Github</button>
                          <div className="clearfix"></div>
                          <div className="space-xs"></div>

                          <button type="button" className="btn btn-default-dark btn-lg btn-block "><span>
                          <img className="signUp-ico" src="images/google.png" />
                          </span>Login with Google</button>
                          <div className="space-sm"></div>
                          <hr className="signUp-col-left-hr" />
                          <div className="space-sm"></div>

                      <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                        <input onChange={this.handleChange} type="text" className="form-control url-submit" placeholder="email" name="email"/>
                        {this.state.errors.emailRequired ||this.state.ServerAuthError && <div className="error">{this.state.errors.emailRequired }  {this.state.ServerAuthError}</div>}

                        </div>
                        <div className="form-group">
                        <input  onChange={this.handleChange}  type="text" className="form-control url-submit" placeholder="password" name="password" />
                        {this.state.errors.PasswordRequired && <div className="error">{this.state.errors.PasswordRequired}</div>}
                        </div>
                        <div className="form-group">
                        <input  onChange={this.handleChange}  type="text" className="form-control url-submit" placeholder="password again" name="confirmPassword"/>

                        {this.state.errors.confirmPassword  && <div className="error">{this.state.errors.confirmPassword}</div>}
                        {this.state.errors.ConfirmPasswordRequired &&                         <div className="error">{this.state.errors.ConfirmPasswordRequired}</div>}
                        </div>
                        <button type="submit" className="btn btn-danger  btn-lg btn-block url-submit">SIGN ME UP</button>
                        <div className="space-sm"></div>
                        <p className="form-control-static signUp-col-right-label">Forgot your password ? Click Here.</p>
                        <p className="form-control-static signUp-col-right-label">See our Privacy Policy on how we handle user data.</p>

                      </form>

                      </div>
                      </div>
                  </div>
              </div>


    </div>

  </div>
)
}
}

function mapStateToProps(state){
return {ServerAuthError :  state.auth.error}
}
function mapDispatchToProps(dispatch){
return bindActionCreators({
signup}, dispatch)
}
export default connect(mapStateToProps,
mapDispatchToProps)(Signup);
