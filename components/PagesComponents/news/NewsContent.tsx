import Image from 'next/image'
import Link from 'next/link'
import { NewProps } from 'pages/news'
import React, { FC } from 'react'
import css from './NewsContent.module.css'

const NewsContent: FC<{ news: NewProps[] }> = ({ news }) => {
   return (
      <div className={css.wrapper}>
         {news.map((item) => {
            const { id, time, title, url } = item

            return (
               <Link href={`/news/${url}`} key={id} style={{ textDecoration: 'none' }} passHref>
                  <article className={css.news_card}>
                     <div className={css.image}>
                        <Image src={`/img/news/${id}-min.jpg`} fill alt={`Image for ${title}`} />
                     </div>
                     <div className={css.news_content}>
                        <h3 className={css.news_title}>{title}</h3>
                        <div>
                           <time dateTime={time} className={css.news_date}>
                              {new Date(time).toLocaleDateString('en-UK', {
                                 day: 'numeric',
                                 month: 'long',
                                 year: 'numeric'
                              })}
                           </time>
                        </div>
                     </div>
                  </article>
               </Link>
            )
         })}
      </div>
   )
}

export default NewsContent
