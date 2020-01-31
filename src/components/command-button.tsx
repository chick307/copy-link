import React from 'react';

import styles from './command-button.css';
import { MessageBubble, Direction } from './message-bubble';

export type MessageDirection = Direction;

export type Command = {
    run(): Promise<any>;
};

export type Props = {
    buttonClassName?: string;
    children?: React.ReactNode;
    command: Command;
    failedMessage?: React.ReactNode;
    succeededMessage?: React.ReactNode;
};

type CommandState =
    { type: 'running' } |
    { type: 'succeeded' } |
    { type: 'failed' } |
    { type: 'idle' };

export const CommandButton = (props: Props) => {
    const { buttonClassName = '', children, command, failedMessage, succeededMessage } = props;

    const [commandState, setCommandState] = React.useState<CommandState>({ type: 'idle' });

    const running = commandState.type === 'running';
    const buttonDisabled = running;

    const onButtonClick = React.useCallback(() => {
        if (running)
            return;
        const promise = command.run();
        setCommandState({ type: 'running' });
        promise.then(() => {
            const succeededState = { type: 'succeeded' as const };
            setCommandState(succeededState);
            setTimeout(() => {
                setCommandState((currentCommandState) => {
                    if (currentCommandState !== succeededState)
                        return currentCommandState;
                    return { type: 'idle' };
                });
            }, 1000);
        }, () => {
            const failedState = { type: 'failed' as const };
            setCommandState(failedState);
            setTimeout(() => {
                setCommandState((currentCommandState) => {
                    if (currentCommandState !== failedState)
                        return currentCommandState;
                    return { type: 'idle' };
                });
            }, 1000);
        });
    }, [command]);

    const succeededMessageBubble = React.useMemo(() => {
        if (succeededMessage == null)
            return null;
        return <>
            <MessageBubble className={styles.messageBubble} direction={'left'}>{succeededMessage}</MessageBubble>
        </>;
    }, [succeededMessage])

    const failedMessageBubble = React.useMemo(() => {
        if (failedMessage == null)
            return null;
        return <>
            <MessageBubble className={styles.messageBubble} direction={'left'}>{failedMessage}</MessageBubble>
        </>;
    }, [failedMessage]);

    const messageBubble =
        commandState.type === 'succeeded' ? succeededMessageBubble :
        commandState.type === 'failed' ? failedMessageBubble :
        null;

    return <>
        <div className={styles.commandButton}>
            {messageBubble}
            <button className={buttonClassName} disabled={buttonDisabled} onClick={onButtonClick}>
                {children}
            </button>
        </div>
    </>;
};

export default CommandButton;
