import React from 'react';
import ReactDom from 'react-dom';

import '../styles/popup.css';

export const Popup = () => {
    return <>
        Hello, World!
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
