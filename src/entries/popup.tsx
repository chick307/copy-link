import React from 'react';
import ReactDom from 'react-dom';

import '../styles/popup.css';

export const Popup = () => {
    const [tabInfo, setTabInfo] = React.useState<{ title: string; url: string; } | null>(null);

    React.useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
            if (chrome.runtime.lastError) {
                console.error(Error(chrome.runtime.lastError.message));
            } else {
                setTabInfo({
                    title: tab.title || '',
                    url: tab.url || '',
                });
            }
        });
    }, []);

    if (tabInfo === null)
        return <></>;

    return <>
        <div>{tabInfo.title}</div>
        <div>{tabInfo.url}</div>
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
