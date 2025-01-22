import fs from 'fs'
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import path from 'path'
import React, { FC, useEffect, useState } from 'react'
import data from '../data.json'
import css from './index.module.css'

type NewsProps = {
   source: MDXRemoteSerializeResult<Record<string, unknown>, Record<string, unknown>>
}

const News: FC<NewsProps> = ({ source }) => {
   useEffect(() => {
      const body = document.getElementById('news')
      const links = body.querySelectorAll<HTMLAnchorElement>('a')
      links.forEach((link) => {
         if (link.hostname !== window.location.hostname) {
            link.setAttribute('target', '_blank')
            link.setAttribute('rel', 'noopener noreferrer')
         }
      })
   }, [])

   return (
      <div id='news' className='body-wrapper'>
         <h1 className='h1'>NEWS</h1>
         <div className={css.new_wrapper}>
            <MDXRemote {...source} />
         </div>
      </div>
   )
}

export async function getServerSideProps({ params }: { params: { id: string } }) {
   const filePath = path.join(process.cwd(), 'components/PagesComponents/news/content', `${params.id}.mdx`)
   const fileContent = fs.readFileSync(filePath, 'utf-8')
   const mdxSource = await serialize(fileContent)
   const currentNews = data.news.find((d) => d.url === params.id)

   const seo = {
      description: currentNews.title,
      pageTitle: currentNews.title,
      siteTitle: 'Mediterranean Shipping Register'
   }

   return {
      props: {
         seo,
         source: mdxSource
      }
   }
}

export default News
