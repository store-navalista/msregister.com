import React from "react";
import st from "./ServicesContent.module.css";

function ServicesContent({ data }) {
  const { h1, text } = data;
  let key = 0;
  return (
    <>
      <h1 className={st.h1}>{h1}</h1>
      <div className={st.content_wrapper}>
        <div className={st.content_block}>
          {text.map((sentence) => {
            if (!Array.isArray(sentence)) {
              if (typeof sentence === "string") {
                key++;
                return (
                  <p key={key} className={st.paragraph}>
                    {sentence}
                  </p>
                );
              } else {
                switch (Object.keys(sentence)[0]) {
                  case "h2":
                    key++;
                    return (
                      <h2 key={key} className={st.h2}>
                        {sentence.h2}
                      </h2>
                    );
                  case "h4":
                    key++;
                    return (
                      <h4 key={key} className={st.h4}>
                        {sentence.h4}
                      </h4>
                    );
                  case "link":
                    key++;
                    return (
                      <a
                        key={key}
                        className={st.link}
                        href={"https://" + sentence.link}
                        title={"Link to " + sentence.link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {Object.values(sentence)}
                      </a>
                    );
                  case "mail":
                    key++;
                    return (
                      <a
                        key={key}
                        className={st.link}
                        href={"mailto:" + sentence.mail}
                        title={"Mail to " + sentence.mail}
                      >
                        {Object.values(sentence)}
                      </a>
                    );
                  case "phone":
                    key++;
                    return (
                      <a
                        key={key}
                        className={st.link}
                        href={"tel:" + sentence.phone}
                        title={"Call to " + sentence.phone}
                      >
                        {Object.values(sentence)}
                      </a>
                    );
                  default:
                    key++;
                    return (
                      <h3 key={key} className={st.h3}>
                        {sentence.h3}
                      </h3>
                    );
                }
              }
            } else {
              key++;
              return (
                <ul key={key}>
                  {sentence.map((row) => {
                    key++;
                    return (
                      <>
                        {Array.isArray(row) ? (
                          row.map((r) => {
                            key++;
                            return (
                              <li
                                style={{
                                  marginLeft: "40px",
                                  paddingTop: "20px",
                                }}
                                key={key}
                              >
                                &#9702; {r}
                              </li>
                            );
                          })
                        ) : (
                          <li key={key}>&#183; {row}</li>
                        )}
                      </>
                    );
                  })}
                </ul>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}

export default ServicesContent;
