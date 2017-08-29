import React from 'react';

const Preview = ({title, text, date}) => {

    const stripHTML = (html) => {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    const previewLength = 100;

    return <div>
        <h2>{title}</h2>
        <div><strong>{date.toLocaleString()}</strong></div>
        <p>
            {stripHTML(text).substring(0, previewLength)}
            {"..."}
        </p>
    </div>;
}

export default Preview;
