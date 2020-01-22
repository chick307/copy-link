import React from 'react';

import { ClipboardService } from '../services/clipboard-service';
import styles from './copy-text-button.css';

export type Props = {
    children?: React.ReactNode;
    clipboardService: ClipboardService;
    data: string;
};

export const CopyTextButton = (props: Props) => {
    const { children = 'Copy', clipboardService, data } = props;

    const onButtonClick = React.useCallback(() => {
        clipboardService.writeText(data);
    }, [data]);

    return <>
        <div className={styles.copyTextButton}>
            <span className={styles.data}>{data}</span>
            <button className={styles.button} onClick={onButtonClick}>{children}</button>
        </div>
    </>;
};

export default CopyTextButton;
