"use client";

export const SVG = () => {
    return (
        <svg
            id="animated-logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 518 44"
            shapeRendering="geometricPrecision"
            textRendering="geometricPrecision"
            style={{
                width: "100%",
                height: "auto",
                display: "block",
            }}
        >
            <style jsx>{`
                path {
                    stroke: #003d63;
                    stroke-dasharray: var(--dash-array);
                    stroke-dashoffset: var(--dash-offset);
                    fill: rgba(0, 61, 99, 0);
                    animation: drawStroke 1.5s linear forwards, fillStroke 0.5s linear 1.5s forwards;
                }

                @keyframes drawStroke {
                    to {
                        stroke-dashoffset: 0;
                    }
                }

                @keyframes fillStroke {
                    to {
                        fill: rgba(0, 61, 99, 1);
                        stroke: rgba(0, 61, 99, 0);
                    }
                }
            `}</style>

            <path id="path1" d="M256.4,39.9c-.6.5-1.2.7-1.9.7-.9,0-1.8-.4-2.3-1.1l-24-29.7c-2.4-3-6.9-3-9.3,0L194.8,39.6c-1,1.2-2.8,1.4-4,.4-1.3-1.1-1.5-2.9-.4-4.2L216.9,3c1.3-1.6,3.3-2.6,5.4-2.6h2.4c2.1,0,4.1,1,5.4,2.6l26.7,32.9c1.1,1.2.9,3-.4,4Z" transform="translate(2.679901 1.579867)" style={{ "--dash-array": "204.95", "--dash-offset": "204.95" } as React.CSSProperties} />

            <path id="path2" d="M511.6,39.7c-.6.5-1.2.7-1.9.7-.9,0-1.8-.4-2.3-1.1l-24-29.7c-2.4-3-6.9-3-9.3,0L450,39.4c-1,1.2-2.8,1.4-4,.4-1.3-1.1-1.5-2.9-.4-4.2L472,2.8c1.3-1.6,3.3-2.6,5.4-2.6h2.4c2.1,0,4.1,1,5.4,2.6L512,35.7c1,1.2.8,3-.4,4Z" transform="translate(2.679901 1.579869)" style={{ "--dash-array": "204.88", "--dash-offset": "204.88" } as React.CSSProperties} />

            <path id="path3" d="M132.7,39.9c-.6.5-1.2.7-1.9.7-.9,0-1.8-.4-2.3-1.1l-24-29.7c-2.4-3-6.9-3-9.3,0L71,39.6c-1,1.2-2.8,1.4-4,.4-1.3-1.1-1.5-2.9-.4-4.2L93.1,3c1.3-1.6,3.3-2.6,5.4-2.6h2.4c2.1,0,4.1,1,5.4,2.6L133,35.9c1.1,1.2.9,3-.3,4Z" transform="translate(2.679901 1.579869)" style={{ "--dash-array": "204.97", "--dash-offset": "204.97" } as React.CSSProperties} />

            <path id="path4" d="M129.5,1.1c.5-.5,1.2-.7,1.8-.7.9,0,1.7.4,2.3,1.1l23.5,29.7c2.3,3,6.8,3,9.1,0L189.8,1.4c1-1.2,2.7-1.4,3.9-.4c1.3,1.1,1.4,2.9.4,4.2L167.8,38.4c-1.1,1.4-2.8,2.2-4.6,2.2h-3.2c-1.8,0-3.4-.8-4.6-2.2L129.1,5.1c-1-1.2-.8-3,.4-4Z" transform="translate(2.679901 1.579869)" style={{ "--dash-array": "203.06", "--dash-offset": "203.06" } as React.CSSProperties} />

            <path id="path5" d="M313.8,36.7v1.3c0,1.1-.9,2-2,2h-35.4c-6.6,0-12-5.4-12-12v-25.6c0-1.1.9-2,2-2h2.2c1.1,0,2,.9,2,2v26.3c0,3.3,2.7,6,6,6h35.2c1.1,0,2,.9,2,2Z" transform="translate(2.679901 1.579869)" style={{ "--dash-array": "166.83", "--dash-offset": "166.83" } as React.CSSProperties} />

            <path id="path6" d="M328.3,40.2h-1.8c-1.1,0-2-.9-2-2v-35.8c0-1.1.9-2,2-2h1.8c1.1,0,2,.9,2,2v35.8c0,1.1-.9,2-2,2Z" transform="translate(2.679901 1.579868)" style={{ "--dash-array": "87.77", "--dash-offset": "87.77" } as React.CSSProperties} />

            <path id="path7" d="M394.3,26.9v2.9c0,5.5-4.5,9.9-10,9.9h-39.4c-1.1,0-2-.9-2-2v-.9c0-1.1.9-2,2-2h38c3.3,0,6-2.7,6-6v-1.1c0-3.3-2.7-6-6-6h-28.6c-5,0-9-4-9-8.9v-3.4c0-4.9,4-8.9,9-8.9h33.7c1.1,0,2,.9,2,2v.9c0,1.1-.9,2-2,2h-32.3c-2.8,0-5,2.2-5,5v1.6c0,2.7,2.2,5,5,5h28.6c5.6-.1,10,4.4,10,9.9Z" transform="translate(2.679901 1.579869)" style={{ "--dash-array": "317.97", "--dash-offset": "317.97" } as React.CSSProperties} />

            <path id="path8" d="M450,2.4v1c0,1.1-.9,2-2,2h-21v33c0,1.1-.9,2-2,2h-2c-1.1,0-2-.9-2-2v-33h-21c-1.1,0-2-.9-2-2v-1c0-1.1.9-2,2-2h48c1.1,0,2,.9,2,2Z" transform="translate(2.679901 1.579868)" style={{ "--dash-array": "178.85", "--dash-offset": "178.85" } as React.CSSProperties} />

            <path id="path9" d="M9.2,10.5c-1.4-.9-3.3.1-3.3,1.8v25.4c0,1.6-1.3,2.9-2.9,2.9v0c-1.6,0-2.9-1.3-2.9-2.9L0,4.1c0-3,3.3-4.7,5.8-3.1L46.7,30.4c1.4.9,3.3-.1,3.3-1.8v-25.3c0-1.6,1.3-2.9,2.9-2.9h.1c1.6,0,2.9,1.3,2.9,2.9v33.6c0,3-3.3,4.7-5.8,3.1L9.2,10.5Z" transform="translate(2.679901 1.579867)" style={{ "--dash-array": "262.28", "--dash-offset": "262.28" } as React.CSSProperties} />
        </svg>
    );
};
