import React from 'react'
import ReactLoading from 'react-loading';

const Loading = ( { type, color }) => (
    <ReactLoading className='loader' type={'spin'} color={'#333333'} height='50' width='50' />
);

export default Loading;
