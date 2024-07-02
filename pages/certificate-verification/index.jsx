import React from 'react'
import CertificatesContent from '../../components/PagesComponents/contents/CertificatesContent'
import { useSearchParams } from 'next/navigation'

function Certificates() {
   const searchParams = useSearchParams()
   const pdf_file = searchParams.get('IMO')

   return (
      <>
         <div className='body-wrapper'>
            <CertificatesContent pdf_file={pdf_file} />
         </div>
      </>
   )
}

export default Certificates
// /certificate-verification/9334648/12406003/certificate-of-classification-hull-and-machinery
// https://www.msregister.com/certificate-verification?IMO=9334648/12406003/certificate-of-classification-hull-and-machinery
