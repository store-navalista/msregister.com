import { NextApiRequest, NextApiResponse } from 'next'

const data = {
   vessel: 'PRIISMA',
   imo: 9299678,
   cert_number: 24323424,
   cert_status: 'Verified',
   cert_name: 'Record of Construction and Equipment for Oil Tankers (Form B)',
   issue_date: '12 December 2024'
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
   const { utn } = req.query

   if (utn === '1234') {
      return res.status(200).json(data)
   } else {
      return res.status(404).json({ message: 'Certificate not found' })
   }
}
