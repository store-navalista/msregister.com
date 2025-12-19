"use client";

import { useEffect } from "react";

export const SiteLoader = () => {
    useEffect(() => {
        const loader = document.getElementById("global-loader");
        loader?.classList.add("hide");
    }, []);

    return (
        <div id="global-loader">
            <div className="loader">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="80" viewBox="0 0 46.85 25.52">
                    <path fill="#39527a" d="m7.66,13.83L13.4.14h2.07v25.22h-1.98V3.8l-5.83,13.73L1.83,3.8v21.58H0V.14h1.93l5.73,13.69Z" />
                    <path fill="#f8a541" d="m16.56,4.42V1.69c1.23-1.05,2.79-1.62,4.4-1.62,5.11,0,6.86,3.11,6.87,6.96h-1.56c.12-3.08-1.33-5.46-5.07-5.46-1.96-.01-3.76,1.1-4.64,2.85Zm0,3.2c.35.44.72.86,1.12,1.25.64.57,1.33,1.06,2.1,1.45,3.04,1.58,5.65,3.11,6.67,3.99,1.42,1.23,2.13,2.58,2.13,4.07.01,3.17-1.22,5.31-3.7,6.42-1.81.82-4.31.85-6.44.19-.66-.22-1.28-.52-1.87-.88v-1.93c.76.56,1.33.94,1.73,1.12.88.39,1.82.62,2.79.67,3.6.1,5.76-2.22,5.76-4.75,0-.99-.16-2.1-.96-3.03-.89-1.03-2.4-1.9-4-2.8-.96-.54-1.9-1.14-2.9-1.68-.87-.48-1.67-1.06-2.4-1.73v-2.37h-.01Z" />
                    <path fill="#61b357" d="m38.28,12.98c4.62-.36,6.86-3.2,6.86-6.57,0-3.57-2.19-6.33-7.66-6.42h-8.38v25.52h1.73v-12.49h5.61l8.05,12.49h2.35l-8.57-12.53Zm-7.45-1.35V1.38h6.28c4.32.06,6.32,2.25,6.32,5.05s-2.25,5.15-6.32,5.21h-6.28Z" />
                </svg>
            </div>
            <style>{`
            #global-loader {
              position: fixed;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              display: flex;
              align-items: center;
              background-color: #fff;
              justify-content: center;
              z-index: 9999;
              transition: opacity 0.3s ease;
            }

            .loader {
              font-family: sans-serif;
              font-size: 18px;
              animation: fade 1s infinite alternate;
            }

            @keyframes fade {
              from { opacity: 1; }
              to { opacity: 0.3; }
            }
          `}</style>
        </div>
    );
};
