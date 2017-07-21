import React from 'react';

 const FormErrors = (props) =>{
  return (
    <div className='formErrors'>
      {(props.error.length > 0)?(props.error):('')}
    </div>

  )
}

export default FormErrors
