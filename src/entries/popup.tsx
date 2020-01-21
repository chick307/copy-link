import React from 'react';
import ReactDom from 'react-dom';

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

    const onTitleCopyButtonClick = React.useCallback(() => {
        if (tabInfo === null)
            return; // never
        clipboardService.writeText(tabInfo.title);
    }, [tabInfo]);

    if (tabInfo === null)
        return <></>;

    return <>
        <div>
            {tabInfo.title}
            <button onClick={onTitleCopyButtonClick}>Copy Title</button>
        </div>
        <div>{tabInfo.url}</div>
    </>;
};

ReactDom.render(<Popup />, document.querySelector('#container'));
