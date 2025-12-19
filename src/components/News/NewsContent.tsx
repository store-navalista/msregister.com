"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FC, Fragment, useLayoutEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useAnimateOnView } from "../hooks/useAnimateOnView";
import { SVG } from "../SVG";
import css from "./NewsContent.module.css";
import { SmartLink } from "../Pages/SmartLink/SmartLink";
import { NewItemType } from "@/constants/types";
import { useGetNewsPageQuery } from "@/store/reducers/apiReducer";

const New: FC<{ index: number; item: NewItemType }> = ({ index, item }) => {
    const delay = index < 5 ? index * 0.1 : 0;
    const { ref, animation } = useAnimateOnView("none", delay, 0.1, 1);
    const { title, create_date, image_file, id } = item;

    const date = new Date(create_date.ts);
    const formatted = date.toISOString().slice(0, 10);

    return (
        <motion.div ref={ref} className={css.new} {...animation}>
            <SmartLink href={`?id=${id}`} className={css.link}>
                <div className={css.icon}>
                    <Image src={image_file} fill alt="news icon" />
                    <SVG.Eye className={css.eye} />
                </div>
                <div className={css.content}>
                    <p className={css.description}>{title}</p>
                    <p className={css.date}>{formatted}</p>
                </div>
                <div className={css.gif}>
                    <Image src="/gifs/cat.gif" alt="Animated GIF" width={20} height={20} unoptimized />
                </div>
            </SmartLink>
        </motion.div>
    );
};

export const NewsContent = () => {
    const isScreen = useMediaQuery({ query: "(min-width: 1176px)" });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [newsData, setNewsData] = useState<NewItemType[]>([]);
    const loaderRef = useRef<HTMLDivElement | null>(null);
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const { data, isFetching, isLoading, isError } = useGetNewsPageQuery(page);

    useLayoutEffect(() => {
        if (typeof data === "undefined") return;

        if (!data.items || data.items.length === 0) {
            setHasMore(false);
            return;
        }

        const filteredData = [...(data?.items ?? [])].sort((a, b) => new Date(b.create_date.ts).getTime() - new Date(a.create_date.ts).getTime());

        setNewsData((prev) => [...prev, ...filteredData]);
    }, [data]);

    useLayoutEffect(() => {
        if (isError) {
            setHasMore(false);
        }
    }, [isError]);

    useLayoutEffect(() => {
        if (!hasMore || isLoading) return;
        if (!scrollRef.current || !loaderRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage((p) => p + 1);
                }
            },
            {
                root: scrollRef.current,
                threshold: 0.1,
            }
        );

        observer.observe(loaderRef.current);

        return () => observer.disconnect();
    }, [hasMore, isLoading, newsData]);

    return (
        <div style={{ position: "relative" } as React.CSSProperties} className={css.block}>
            <div className={css.top_mirror}>
                <h1 className={css.mirror_title}>News</h1>
            </div>

            {!newsData.length ? (
                <div className={css.loader}>
                    <Image src="/images/svg/loader.svg" alt="loader" width={48} height={48} />
                </div>
            ) : (
                <div className={css.news_block}>
                    <motion.div ref={scrollRef} className={css.news} initial={{ x: isScreen ? 225 : 0 }} animate={{ x: 0 }} transition={{ duration: 0.5, delay: 1 }}>
                        {newsData.map((item, index) => (
                            <Fragment key={`${item.id}-${index}`}>
                                <New index={index} item={item} />
                            </Fragment>
                        ))}

                        {isFetching && (
                            <div className={css.loader}>
                                <Image src="/images/svg/loader.svg" alt="Loading..." width={30} height={30} />
                            </div>
                        )}
                        {hasMore && <div ref={loaderRef} style={{ height: 1 }} />}
                    </motion.div>

                    {isScreen && <motion.div className={css.image} initial={{ opacity: 0, filter: "blur(50px)" }} animate={{ opacity: 1, filter: "blur(0)" }} transition={{ duration: 0.3, delay: 1.5 }} />}
                </div>
            )}
        </div>
    );
};
