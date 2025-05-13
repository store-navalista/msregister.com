import React from 'react'
import data from './data.json'
import store from '../../../store/store'
import ServicesContent from '../../../components/PagesComponents/contents/ServicesContent'

function TechnicalSupervisionInIndustry({ data }) {
   return (
      <>
         <div className='body-wrapper'>
            <ServicesContent data={data} />
         </div>
      </>
   )
}

export async function getStaticProps() {
   const seo = store.asidePages[2].seo
   return {
      props: {
         data,
         seo
      }
   }
}

export default TechnicalSupervisionInIndustry
