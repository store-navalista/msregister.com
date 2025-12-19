import React, { FC, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import css from "./NewsBlock.module.css";
import { UI } from "@/components/UI";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SmartLink } from "../../SmartLink/SmartLink";
import { NewItemType } from "@/constants/types";

const LoadedImage: FC<{ image_file: string }> = ({ image_file }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div>
            {!loaded && <Image src="/images/svg/loader.svg" alt="loader" width={48} height={48} />}
            <Image src={image_file} onLoad={() => setLoaded(true)} fill alt="news" />;
        </div>
    );
};

export const NewsBlock = () => {
    const [newsData, setNewsData] = useState<NewItemType[]>([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const dataRes = await fetch(`/api/news/1`, {
                    method: "GET",
                    credentials: "include",
                });

                if (dataRes.ok) {
                    const news = await dataRes.json();
                    setNewsData(news.items);
                }
            } catch (error) {
                console.error("Token verification failed:", error);
            }
        };

        getData();
    }, []);

    const filteredNews = [...newsData].sort((a, b) => new Date(b.create_date.ts).getTime() - new Date(a.create_date.ts).getTime()).slice(0, 7);

    return (
        <div className={css.news}>
            <h2>News</h2>
            <p className={css.description}>Stay updated with the latest developments regulatory changes and company announcements.</p>
            {!newsData?.length ? (
                <div className={css.newsLoader}>
                    <Image src="/images/svg/loader.svg" alt="loader" width={48} height={48} />
                </div>
            ) : (
                <Swiper
                    spaceBetween={30}
                    slidesPerView="auto"
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Pagination]}
                    className={css.swiper}
                >
                    {filteredNews.map((item) => {
                        const { image_file, title, create_date, id } = item;
                        const date = new Date(create_date.ts);
                        const formatted = date.toISOString().slice(0, 10);

                        return (
                            <SwiperSlide key={id} className={css.slide}>
                                <div className={css.desc}>
                                    <p className={css.text}>{title}</p>
                                    <p className={css.time}>{formatted}</p>
                                </div>
                                <div className={css.image}>
                                    <LoadedImage image_file={image_file} />
                                </div>
                                <SmartLink href={`/newsroom?id=${id}`} className={css.link} />
                            </SwiperSlide>
                        );
                    })}
                    <SwiperSlide className={css.slide} style={{ boxShadow: "none", backgroundColor: "#fff" }}>
                        <UI.Button variant="link" colorScheme="primary" className={css.other_news} href="/newsroom">
                            See other news...
                        </UI.Button>
                    </SwiperSlide>
                </Swiper>
            )}
        </div>
    );
};
