import React from 'react';

import styles from './message-bubble.css';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

export type Props = {
    children: React.ReactNode;
    className?: string;
    direction?: Direction;
};

export const MessageBubble = (props: Props) => {
    const { children, className = '', direction } = props;

    const directionClassName = direction == null ? '' : `direction-${direction}`;

    return <>
        <div className={className}>
            <div className={`${styles[directionClassName]} ${styles.message}`}>
                {children}
            </div>
        </div>
    </>;
};

export default MessageBubble;
