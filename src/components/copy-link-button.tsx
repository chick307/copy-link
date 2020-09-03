import React from 'react';

import { LinkData } from '../values/link-data';
import { ClipboardService } from '../services/clipboard-service';
import { escape as htmlEscape } from '../utils/html';
import copyButtonGroupStyles from './copy-button-group.css';
import styles from './copy-link-button.css';
import { CommandButton } from './command-button';

export type Props = {
    children?: React.ReactNode;
    clipboardService: ClipboardService;
    data: LinkData;
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

    const [dropdownVisible, setDropdownVisible] = React.useState(() => false);

    const toggleDropdownCommand = React.useMemo(() => {
        return {
            run: async () => {
                setDropdownVisible((visible) => !visible);
            },
        };
    }, []);

    const copyHtmlLinkCommand = React.useMemo(() => {
        return {
            run: async () => {
                await clipboardService.writeText(html);
            },
        };
    }, [data]);

    React.useEffect(() => {
        const listener = () => {
            setDropdownVisible(() => false);
        };
        document.addEventListener('click', listener, false);
        return () => {
            document.removeEventListener('click', listener);
        };
    }, []);

    const stopPropagation = React.useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.nativeEvent.stopImmediatePropagation();
    }, []);

    return <>
        <div className={`${styles.copyLinkButton} ${copyButtonGroupStyles.copyButton}`}>
            <span className={styles.data}>
                <a href={data.url} onClick={preventDefault}>
                    {data.title}
                </a>
            </span>
            <div className={styles.buttonGroup}>
                <CommandButton className={styles.commandButton} buttonClassName={styles.button} command={command}
                    succeededMessage={'Copied'} failedMessage={'Failed'}>
                    {children}
                </CommandButton>
                <div onClick={stopPropagation}>
                    <CommandButton buttonClassName={styles.dropdownButton} command={toggleDropdownCommand}>
                        <img className={styles.dropdownButtonIcon} src='assets/images/chevron-down.svg' />
                    </CommandButton>
                    <div className={`${styles.dropdown} ${dropdownVisible ? styles.visible : ''}`}>
                        <CommandButton buttonClassName={styles.button}
                            command={copyHtmlLinkCommand} succeededMessage={'Copied'} failedMessage={'Failed'}>
                            Copy Link as HTML
                        </CommandButton>
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default CopyLinkButton;
