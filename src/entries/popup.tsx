import React from 'react';
import ReactDom from 'react-dom';

import { BrowserTabService, Tab } from '../services/browser-tab-service';
import '../styles/popup.css';

export const Popup = () => {
    const browserTabService = React.useMemo(() => new BrowserTabService(), []);

    const [tabInfo, setTabInfo] = React.useState<{ title: string; url: string; } | null>(null);

    React.useEffect(() => {
        browserTabService.getCurrentTab().then(setTabInfo);
    }, []);

    if (tabInfo === null)
        return <></>;

    return <>
        <div>{tabInfo.title}</div>
        <div>{tabInfo.url}</div>
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
