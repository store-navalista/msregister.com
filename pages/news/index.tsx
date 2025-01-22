import React, { FC } from 'react'
import store from 'store/store'
import data from './data.json'
import css from './index.module.css'
import NewsContent from 'components/PagesComponents/news/NewsContent'

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

const News: FC<{ data: DataProps }> = ({ data }) => {
   const { h1, news } = data

   return (
      <div className='body-wrapper'>
         <h1 className='h1'>{h1}</h1>
         <div className={css.news_wrapper}>
            <NewsContent news={news} />
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
