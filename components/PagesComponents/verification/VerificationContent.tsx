import React, { FC } from 'react'
import { VComponents } from './components'
import css from './VerificationContent.module.css'

export const VerificationContent: FC<{ utn: string }> = ({ utn }) => {
   return (
      <div className={css.wrapper}>
         <VComponents.Main utn={utn} />
      </div>
   )
}
