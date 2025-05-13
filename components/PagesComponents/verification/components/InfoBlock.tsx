import React, { FC, useCallback, useEffect } from 'react'
import css from '../VerificationContent.module.css'
import Image from 'next/image'
import axios from 'axios'

type InfoBlockProps = {
   utn: string
   setError: React.Dispatch<React.SetStateAction<string>>
   setLoading: React.Dispatch<React.SetStateAction<boolean>>
   fetchTrigger: boolean
}

export const InfoBlock: FC<InfoBlockProps> = ({ utn, setError, setLoading, fetchTrigger }) => {
   const [isCertificateDownloading, setIsCertificateDownloading] = React.useState(false)
   const [data, setData] = React.useState(null)

   useEffect(() => {
      const fetchData = async () => {
         if (!utn) return
         setError('')
         setLoading(true)
         try {
            const response = await axios.get(`/api/mock?utn=${utn}`)
            setData(response.data)
         } catch (error) {
            setError('No results found...')
            setData(null)
            console.error('Error fetching data:', error)
         } finally {
            setLoading(false)
         }
      }
      fetchData()
   }, [utn, fetchTrigger])

   const downloadHandler = () => {
      setIsCertificateDownloading(true)
      setTimeout(() => {
         setIsCertificateDownloading(false)
      }, 2000)
   }

   if (!data) return

   return (
      <div className={css.data_body}>
         <div className={css.message}>
            <p>Verified!</p>
            <p>This is a verified document</p>
         </div>
         <div className={css.info}>
            <div className={css.data_item}>
               <p>Vessel</p>
               <p>{data.vessel}</p>
            </div>
            <div className={css.data_item}>
               <p>IMO Number</p>
               <p>{data.imo}</p>
            </div>
            <div className={css.data_item}>
               <p>Certificate Number</p>
               <p>{data.cert_number}</p>
            </div>
            <div className={css.data_item}>
               <p>Certificate Status</p>
               <p>{data.cert_status}</p>
            </div>
            <div className={css.data_item}>
               <p>Certificate Name</p>
               <p>{data.cert_name}</p>
            </div>
            <div className={css.data_item}>
               <p>Issue Date</p>
               <p>{data.issue_date}</p>
            </div>
         </div>
         <button onClick={downloadHandler} className={css.download_button} disabled={isCertificateDownloading}>
            <div style={{ opacity: isCertificateDownloading ? 0 : 1 }}>
               <Image src='/svg/download.svg' alt='arrow' width={20} height={20} />
               <p>View E-Certificate</p>
            </div>
            <Image
               style={{ opacity: !isCertificateDownloading ? 0 : 1 }}
               src='/svg/loader-light.svg'
               alt='arrow'
               width={24}
               height={24}
            />
         </button>
      </div>
   )
}
