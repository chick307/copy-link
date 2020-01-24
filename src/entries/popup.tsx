import React from 'react';
import ReactDom from 'react-dom';

import { CopyButtonGroup } from '../components/copy-button-group';
import { CopyLinkButton } from '../components/copy-link-button';
import { CopyTextButton } from '../components/copy-text-button';
import { BrowserTabService } from '../services/browser-tab-service';
import { ClipboardService } from '../services/clipboard-service';
import '../styles/popup.css';
import { LinkData } from '../values/link-data';

export const Popup = () => {
    const browserTabService = React.useMemo(() => new BrowserTabService(), []);
    const clipboardService = React.useMemo(() => new ClipboardService(), []);

    const [linkData, setLinkData] = React.useState<LinkData | null>(null);

    React.useEffect(() => {
        browserTabService.getCurrentTab().then(setLinkData);
    }, []);

    if (linkData === null)
        return <></>;

    return <>
        <CopyButtonGroup>
            <CopyLinkButton clipboardService={clipboardService} data={linkData}>Copy Link</CopyLinkButton>
            <CopyTextButton clipboardService={clipboardService} data={linkData.title}>Copy Title</CopyTextButton>
            <CopyTextButton clipboardService={clipboardService} data={linkData.url}>Copy URL</CopyTextButton>
        </CopyButtonGroup>
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
