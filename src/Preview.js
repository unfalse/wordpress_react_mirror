import React, { Component } from 'react';

class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    stripHTML(html) {
        let tmp = document.createElement("DIV");
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }

    render() {
        const previewLength = 100;
        const { title, text, date } = this.props;
        return (
            <div>
                <h2>{title}</h2>
                <div><strong>{date.toLocaleString()}</strong></div>
                <p>
                    {this.stripHTML(text).substring(0, previewLength)}
                    {"..."}
                </p>
            </div>);
    }
}

export default Preview;