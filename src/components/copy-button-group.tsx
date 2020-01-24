import React from 'react';

import styles from './copy-button-group.css';

export type Props = {
    children?: React.ReactNode;
};

export const CopyButtonGroup = (props: Props) => {
    const { children = null } = props;
    return <>
        <div className={styles.copyButtonGroup}>
            {children}
        </div>
    </>;
};

export default CopyButtonGroup;
