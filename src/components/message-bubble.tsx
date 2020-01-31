import React from 'react';

import styles from './message-bubble.css';

export type Color = 'black' | 'red';

export type Direction = 'top' | 'right' | 'bottom' | 'left';

export type Props = {
    children: React.ReactNode;
    className?: string;
    color?: Color;
    direction?: Direction;
};

export const MessageBubble = (props: Props) => {
    const { children, className = '', color = 'black', direction } = props;

    const colorClassName = `color-${color}`;
    const directionClassName = direction == null ? '' : `direction-${direction}`;

    return <>
        <div className={className}>
            <div className={`${styles[colorClassName]} ${styles[directionClassName]} ${styles.message}`}>
                {children}
            </div>
        </div>
    </>;
};

export default MessageBubble;
