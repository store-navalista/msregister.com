import React from 'react'
import { useRouter } from 'next/router'
import store from '@/store/store'
import { VerificationContent } from '@/components/PagesComponents/verification/VerificationContent'

function Verification() {
   const router = useRouter()
   const utn = router.query.utn

   return (
      <div className='body-wrapper'>
         <VerificationContent utn={utn} />
      </div>
   )
}

export async function getStaticPaths() {
   return {
      paths: [],
      fallback: 'blocking'
   }
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
