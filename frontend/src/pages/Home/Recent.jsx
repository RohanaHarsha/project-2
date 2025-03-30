import React from 'react'
import Heading from "../../components/commen/Heading"
import "../Home/Recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
    return (
      <>
        <section className='recent padding'>
          <div className='container'>
            <Heading title='Recent Property Listed' subtitle='Unlock the door to your dream home with innovative listings that spark your imagination.' />
            <RecentCard/>
          </div>
        </section>
      </>
    )
  }
  
  export default Recent
