import React from 'react';

import { LinkData } from '../values/link-data';
import { ClipboardService } from '../services/clipboard-service';
import copyButtonGroupStyles from './copy-button-group.css';
import styles from './copy-link-button.css';
import { CommandButton } from './command-button';

export type Props = {
    children?: React.ReactNode;
    clipboardService: ClipboardService;
    data: LinkData;
};

const htmlEscape = (text: string, { quot = false } = {}) => {
    const div = document.createElement('div');
    div.textContent = text;
    if (quot)
        return div.innerHTML.replace(/"/g, '&quot;');
    return div.innerHTML;
};

export const CopyLinkButton = (props: Props) => {
    const { children = 'Copy', clipboardService, data } = props;

    const html = React.useMemo(() => {
        const escapedUrl = htmlEscape(data.url, { quot: true });
        const escapedTitle = htmlEscape(data.title);
        return `<a href="${escapedUrl}">${escapedTitle}</a>`;
    }, [data]);

    const command = React.useMemo(() => {
        return {
            run: async () => {
                await clipboardService.writeHtml(html, data.title);
            },
        };
    }, [data]);

    const preventDefault = React.useCallback((e: { preventDefault(): void; }) => {
        e.preventDefault();
    }, []);

    return <>
        <div className={`${styles.copyLinkButton} ${copyButtonGroupStyles.copyButton}`}>
            <span className={styles.data}>
                <a href={data.url} onClick={preventDefault}>
                    {data.title}
                </a>
            </span>
            <CommandButton buttonClassName={styles.button} command={command} succeededMessage={'Copied'}>
                {children}
            </CommandButton>
        </div>
    </>;
};

export default CopyLinkButton;
