import React from 'react';

import { ClipboardService } from '../services/clipboard-service';
import { CommandButton } from './command-button';
import copyButtonGroupStyles from './copy-button-group.css';
import styles from './copy-text-button.css';

export type Props = {
    children?: React.ReactNode;
    clipboardService: ClipboardService;
    data: string;
};

export const CopyTextButton = (props: Props) => {
    const { children = 'Copy', clipboardService, data } = props;

    const command = React.useMemo(() => {
        return {
            run: async () => {
                await clipboardService.writeText(data);
                //
            },
        };
    }, [data]);

    return <>
        <div className={`${styles.copyTextButton} ${copyButtonGroupStyles.copyButton}`}>
            <span className={styles.data}>{data}</span>
            <CommandButton buttonClassName={styles.button} command={command}
                succeededMessage={'Copied'} failedMessage={'Failed'}>
                {children}
            </CommandButton>
        </div>
    </>;
};

export default CopyTextButton;
