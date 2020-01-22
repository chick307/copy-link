import React from 'react';

import { ClipboardService } from '../services/clipboard-service';

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
        <div>
            <span>{data}</span>
            <button onClick={onButtonClick}>{children}</button>
        </div>
    </>;
};

export default CopyTextButton;
