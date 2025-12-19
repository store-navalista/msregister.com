import { Wave } from "./Effects/Wave/Wave";
import css from "./Header.module.css";
import Content from "@/content/en.json" assert { type: "json" };

export const Header = () => {
    return (
        <div className={css.header}>
            <div className={css.block}>
                <Wave waveHeightScale={0.9} height={160} />
                <h1>{Content.CLIENT.Cabinet.description}</h1>
            </div>
        </div>
    );
};
