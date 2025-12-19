"use client";

import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import { AnchorHTMLAttributes, useEffect, useState } from "react";

type Props = {
    href: string;
    children?: React.ReactNode;
    replace?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

export const SmartLink = ({ href, children, className, replace, ...rest }: Props) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const [, setIsNavigating] = useState(false);

    useEffect(() => {
        setIsNavigating(false);
        NProgress.done();
    }, [pathname, searchParams]);

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const targetUrl = new URL(href, window.location.href);
        const currentUrl = new URL(window.location.href);

        if (targetUrl.href === currentUrl.href) {
            NProgress.start();
            setTimeout(() => NProgress.done(), 200);
            return;
        }

        setIsNavigating(true);
        NProgress.start();

        if (replace) {
            router.replace(href);
        } else {
            router.push(href);
        }
    };

    return (
        <NextLink href={href} className={className} onClick={handleClick} {...rest}>
            {children}
        </NextLink>
    );
};
