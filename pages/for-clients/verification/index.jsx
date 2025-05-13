import React from 'react'
import store from '@/store/store'
import { VerificationContent } from '@/components/PagesComponents/verification/VerificationContent'

function Verification() {
   return (
      <div className='body-wrapper'>
         <VerificationContent />
      </div>
   )
}

export async function getStaticProps() {
   const seo = store.asidePages[9].seo
   return {
      props: {
         seo
      }
   }
}

export default Verification
