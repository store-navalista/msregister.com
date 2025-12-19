import React, { FC, ReactNode } from 'react'
import { SVGProps } from './SVGs'

export type SVGWrapperProps = { children: ReactNode } & SVGProps

export const SVGWrapper: FC<SVGWrapperProps> = ({ className, children }) => {
   return (
      <div className={className} style={{ pointerEvents: 'all' }}>
         {children}
      </div>
   )
}
