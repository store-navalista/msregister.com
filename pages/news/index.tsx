import NewsContent from 'components/PagesComponents/news/NewsContent'
import _ from 'lodash'
import Image from 'next/image'
import React, { FC, useCallback, useState } from 'react'
import store from 'store/store'
import data from './data.json'
import css from './index.module.css'

export type NewProps = {
   id: number
   time: string
   title: string
   url: string
}

interface DataProps {
   h1: string
   news: NewProps[]
}

const Icon: FC<{ isFinding: boolean }> = ({ isFinding }) => {
   return (
      <>
         <div className={css.img}>
            <Image src='/svg/loader.svg' fill alt='loader' style={{ opacity: isFinding ? 1 : 0 }} />
         </div>
         <div className={css.img}>
            <Image src='/svg/news-find.svg' fill alt='loader' style={{ opacity: isFinding ? 0 : 1 }} />
         </div>
      </>
   )
}

const News: FC<{ data: DataProps }> = ({ data }) => {
   const [isFinding, setIsFinding] = useState(false)
   const [filteredNews, setFilteredNews] = useState<NewProps[]>(data.news)
   const { h1, news } = data
   const sortedNews = news.sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())

   const findNews = useCallback(
      _.debounce(async (keyword: string) => {
         if (!keyword.trim()) {
            setFilteredNews(news)
            setIsFinding(false)
            return
         }

         setIsFinding(true)

         try {
            const response = await fetch(`/api/filter-news?keyword=${encodeURIComponent(keyword)}`)
            if (response.ok) {
               const result = await response.json()
               setFilteredNews(result)
            } else {
               console.error('Failed to fetch filtered news')
            }
         } catch (error) {
            console.error('Error fetching filtered news:', error)
         } finally {
            setIsFinding(false)
         }
      }, 300),
      [news]
   )

   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const keyword = e.target.value
      findNews(keyword)
   }

   return (
      <div className='body-wrapper'>
         <h1 className='h1'>{h1}</h1>
         <div className={css.news_wrapper}>
            <div className={css.keywords}>
               <Icon {...{ isFinding }} />
               <input onChange={handleInputChange} placeholder='TYPE A KEYWORD' className={css.input} />
            </div>
            <NewsContent news={filteredNews} />
         </div>
      </div>
   )
}

export async function getStaticProps() {
   const seo = store.asidePages.find((p) => p.id === 10).seo

   return {
      props: {
         data,
         seo
      }
   }
}

export default News
