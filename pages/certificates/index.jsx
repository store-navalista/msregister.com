import React from 'react'
import CertificatesContent from '../../components/PagesComponents/contents/CertificatesContent'
import { useSearchParams } from 'next/navigation'

function Certificates() {
   const searchParams = useSearchParams()
   const pdf_file = searchParams.get('pdf')

   return (
      <>
         <div className='body-wrapper'>
            <CertificatesContent pdf_file={pdf_file} />
         </div>
      </>
   )
}

export default Certificates
