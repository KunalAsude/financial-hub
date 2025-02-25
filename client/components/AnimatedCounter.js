'use client'
import React from 'react'
import CountUp from 'react-countup'

const AnimatedCounter = ({amount}) => {
  return (
    <div className='w-full'>
         <CountUp
         duration={2}
         decimal=','
         prefix='₹'
        end={amount}/> 
    </div>
  )
}

export default AnimatedCounter