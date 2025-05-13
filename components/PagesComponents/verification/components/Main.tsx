import React, { FC, useEffect } from 'react'
import css from '../VerificationContent.module.css'
import Image from 'next/image'
import { InfoBlock } from './InfoBlock'
import { useRouter } from 'next/router'

export const Main: FC<{ utn: string }> = ({ utn }) => {
   const router = useRouter()
   const [loading, setLoading] = React.useState(false)
   const [error, setError] = React.useState('')
   const [editedUTN, setEditedUTN] = React.useState(null)
   const [fetchTrigger, setFetchTrigger] = React.useState(false)

   const changeUTN = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value
      if (/^\d*$/.test(value)) {
         setEditedUTN(value)
      }
   }

   const verifyHandler = async () => {
      setLoading(true)
      setFetchTrigger((prevState) => !prevState)
      router.push(`/for-clients/verification/${editedUTN}`)
   }

   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !loading && editedUTN) {
         verifyHandler()
      }
   }

   useEffect(() => {
      if (utn) {
         setEditedUTN(utn)
      }
   }, [utn])

   return (
      <div className={css.main}>
         <div className={css.header}>
            <h2>E-Certificate Verification Portal</h2>
            <p>Certificate verification</p>
         </div>
         <div className={css.input_wrapper + `${loading || !editedUTN ? ' ' + css.loading : ''}`}>
            <p>Unique Tracking Number (UTN)</p>
            <input
               onChange={changeUTN}
               onKeyDown={handleKeyDown}
               type='text'
               value={editedUTN}
               placeholder='Enter UTN'
            />
            <button onClick={verifyHandler} disabled={loading || !editedUTN}>
               {loading ? (
                  <Image src='/svg/loader-light.svg' alt='arrow' width={24} height={24} />
               ) : (
                  <p>Verify certificate</p>
               )}
            </button>
         </div>
         {utn && <InfoBlock {...{ utn, setError, setLoading, fetchTrigger }} />}
         {error && <p className={css.error}>{error}</p>}
      </div>
   )
}
