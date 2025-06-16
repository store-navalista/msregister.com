import React from 'react'
import store from '../../store/store'
import Link from 'next/link'
import css from './index.module.css'
import Image from 'next/image'
import { SurveyPDF } from '@/components/PagesComponents/pdf_creator/PDFCreator'

function Verification() {
   return (
      <div className='body-wrapper'>
         <div className={css.support_wrapper}>
            <div className={css.heading}>
               <h1>Client Support Portal</h1>
               <p>Access tools and resources to support your interaction with our services.</p>
            </div>
            <ul className={css.verfify_link}>
               <li>
                  <Link href='/for-clients/verification'>
                     <Image src='/svg/support-verify.svg' alt='verify' width={20} height={20} /> Verify Certificate
                  </Link>
                  <p>On this page you can verify the certificate.</p>
               </li>
            </ul>
         </div>
         {/* <SurveyPDF tables={tables} /> */}
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
