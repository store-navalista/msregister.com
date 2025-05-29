import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
   const { utn } = req.query

   if (!utn || typeof utn !== 'string') {
      return res.status(400).json({ error: 'UTN is required' })
   }

   try {
      const response = await axios.get(`${process.env.ELMA_API_URL}${utn}`, {
         headers: {
            Authorization: `Bearer ${process.env.ELMA_API_TOKEN}`
         }
      })

      res.status(200).json(response.data)
   } catch (error: any) {
      console.error('API error:', error.response?.data || error.message)
      res.status(500).json({ error: 'Failed to fetch certificate data' })
   }
}
