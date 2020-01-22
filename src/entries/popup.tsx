import React from 'react';
import ReactDom from 'react-dom';

import { CopyTextButton } from '../components/copy-text-button';
import { BrowserTabService, Tab } from '../services/browser-tab-service';
import { ClipboardService } from '../services/clipboard-service';
import '../styles/popup.css';

export const Popup = () => {
    const browserTabService = React.useMemo(() => new BrowserTabService(), []);
    const clipboardService = React.useMemo(() => new ClipboardService(), []);

    const [tabInfo, setTabInfo] = React.useState<{ title: string; url: string; } | null>(null);

    React.useEffect(() => {
        browserTabService.getCurrentTab().then(setTabInfo);
    }, []);

    if (tabInfo === null)
        return <></>;

    return <>
        <CopyTextButton clipboardService={clipboardService} data={tabInfo.title}>Copy Title</CopyTextButton>
        <div>{tabInfo.url}</div>
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
