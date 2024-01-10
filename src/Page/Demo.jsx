import React from 'react';
import ShowVideo from '../Component/ShowVideo';
import ScanQR from './ScanQR';

function Demo(props) {
    return (
        <div>
            {/* <h2 className='text-center text-orange-500 phone:text-3xl'>Page Demo</h2>
            <h2 className='phone:text-xl tablet:text-3xl'>demo phone</h2> */}
            <ScanQR/>
            {/* <ShowVideo/> */}
        </div>
    );
}

export default Demo;