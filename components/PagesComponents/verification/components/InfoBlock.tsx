import axios from 'axios'
import Image from 'next/image'
import React, { FC, useEffect } from 'react'
import css from '../VerificationContent.module.css'

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
      let cancelled = false

      const fetchData = async () => {
         if (!utn) return
         setError('')
         setLoading(true)
         try {
            const response = await axios.get(`/api/verify`, {
               params: { utn }
            })
            if (!cancelled) {
               setData(response.data)
            }
         } catch (error) {
            if (!cancelled) {
               setError('No results found...')
               setData(null)
               console.error('Error fetching data:', error)
            }
         } finally {
            if (!cancelled) {
               setLoading(false)
            }
         }
      }

      fetchData()

      return () => {
         cancelled = true
      }
   }, [utn, fetchTrigger])

   const downloadHandler = () => {
      if (!data?.signed_file) return

      setIsCertificateDownloading(true)

      try {
         const byteCharacters = atob(data.signed_file)
         const byteNumbers = new Array(byteCharacters.length).fill(null).map((_, i) => byteCharacters.charCodeAt(i))
         const byteArray = new Uint8Array(byteNumbers)
         const blob = new Blob([byteArray], {
            type: 'application/pdf'
         })

         const fileURL = URL.createObjectURL(blob)
         window.open(fileURL, '_blank')
      } catch (e) {
         console.error('Error creating and opening file:', e)
         setError('Error opening file')
      } finally {
         setTimeout(() => {
            setIsCertificateDownloading(false)
         }, 2000)
      }
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
               <p>{data.imo_number}</p>
            </div>
            <div className={css.data_item}>
               <p>Certificate Number</p>
               <p>{data.certificate_number}</p>
            </div>
            <div className={css.data_item}>
               <p>Certificate Status</p>
               <p>{data.certificate_status}</p>
            </div>
            <div className={css.data_item}>
               <p>Certificate Name</p>
               <p>{data.certificate_name}</p>
            </div>
            <div className={css.data_item}>
               <p>Issue Date</p>
               <p>{data.issue_date}</p>
            </div>
         </div>
         {data?.signed_file && (
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
         )}
      </div>
   )
}
