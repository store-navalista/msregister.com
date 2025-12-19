import css from "./NotFoundPage.module.css";
import Image from "next/image";
import { SmartLink } from "./Pages/SmartLink/SmartLink";

export default function NotFoundPage() {
    return (
        <p className={css.not_found}>
            <Image src="/images/not-found.jpg" alt="404 Not Found" width={300} height={300} className={css.image} />
            <SmartLink href="/" className={css.btn}>
                Go home
            </SmartLink>
        </p>
    );
}
