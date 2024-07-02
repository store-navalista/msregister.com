import React from 'react'
import st from './CertificatesContent.module.css'
import { Worker, Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'

import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'

const pageLayout = {
   transformSize: ({ size }) => ({
      height: size.height + 30,
      width: size.width + 30
   })
}

const style = {
   padding: '0',
   display: 'flex',
   alignItems: 'center',
   justifyContent: 'center',
   border: 'none',
   backgroundColor: 'var(--color-second-blue)',
   color: '#fff',
   fontSize: '21px',
   borderRadius: '50%',
   width: '30px',
   height: '30px'
}

const renderError = (error) => {
   let message = ''
   switch (error.name) {
      case 'InvalidPDFException':
         message = 'The document is invalid or corrupted'
         break
      case 'MissingPDFException':
         message =
            'Unfortunately, the active time of the certificate has expired or it has not yet been uploaded to the site. Perhaps it will appear in the near future. Thank you.'
         break
      case 'UnexpectedResponseException':
         message = 'Unexpected server response'
         break
      default:
         message = 'Cannot load the document'
         break
   }

   return (
      <div
         style={{
            alignItems: 'center',
            display: 'flex',
            height: '100%',
            justifyContent: 'center',
            padding: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.5)'
         }}
      >
         <div
            style={{
               backgroundColor: '#e53e3e',
               borderRadius: '0.25rem',
               color: '#fff',
               padding: '0.5rem'
            }}
         >
            {message}
         </div>
      </div>
   )
}

const renderToolbar = (Toolbar) => (
   <Toolbar>
      {(slots) => {
         const { ZoomOut, ZoomIn } = slots
         return (
            <div
               style={{
                  alignItems: 'center',
                  display: 'flex'
               }}
            >
               <div style={{ padding: '0px 2px' }}>
                  <ZoomOut>
                     {(props) => (
                        <button style={style} onClick={props.onClick}>
                           -
                        </button>
                     )}
                  </ZoomOut>
               </div>
               <div style={{ padding: '0px 2px' }}>
                  <ZoomIn>
                     {(props) => (
                        <button style={style} onClick={props.onClick}>
                           +
                        </button>
                     )}
                  </ZoomIn>
               </div>
            </div>
         )
      }}
   </Toolbar>
)

function CertificatesContent({ pdf_file }) {
   const defaultLayoutPluginInstance = defaultLayoutPlugin({
      renderToolbar
   })

   return (
      <Worker workerUrl='https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js'>
         <div className={st.wrapper}>
            <div className={st.pdf_viewer}>
               <Viewer
                  plugins={[defaultLayoutPluginInstance]}
                  pageLayout={pageLayout}
                  renderError={renderError}
                  fileUrl={`/certificates/${pdf_file}`}
               />
            </div>
         </div>
      </Worker>
   )
}

export default CertificatesContent
