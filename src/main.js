"use strict"
import React from 'react';
import Menu from './components/menu';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

 class Main extends React.Component{

 render(){
 return(

<div>
<Menu />
    {this.props.children}

</div>


 );
 }
}

 export default Main;
