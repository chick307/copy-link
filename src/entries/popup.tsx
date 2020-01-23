import React from 'react';
import ReactDom from 'react-dom';

import { CopyLinkButton } from '../components/copy-link-button';
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
        <CopyLinkButton clipboardService={clipboardService} data={tabInfo}>Copy Link</CopyLinkButton>
        <CopyTextButton clipboardService={clipboardService} data={tabInfo.title}>Copy Title</CopyTextButton>
        <CopyTextButton clipboardService={clipboardService} data={tabInfo.url}>Copy URL</CopyTextButton>
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
