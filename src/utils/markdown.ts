import { escape as htmlEscape } from './html';

const SPECIAL_CHARACTERS = /[\\`*_{}[\]()#+\-.!|]/g;
const SPECIAL_CHARACTERS_IN_LINK_TEXT = /[\\`*_[\]!|]/g;
const SPECIAL_CHARACTERS_IN_LINK_URL = /[\\()|]/g;

export const escape = (text: string, context: 'link-text' | 'link-url' | 'text' = 'text') => {
    switch (context) {
        case 'link-text': {
            return htmlEscape(text).replace(SPECIAL_CHARACTERS_IN_LINK_TEXT, (c) => `&#${c.charCodeAt(0)};`);
        }
        case 'link-url': {
            return htmlEscape(text).replace(SPECIAL_CHARACTERS_IN_LINK_URL, (c) => `&#${c.charCodeAt(0)};`);
        }
        default: {
            return htmlEscape(text).replace(SPECIAL_CHARACTERS, (c) => `&#${c.charCodeAt(0)};`);
        }
    }
};

export const renderLink = (link: {
    text: string;
    url: string;
}) => {
    const text = escape(link.text, 'link-text');
    const url = escape(link.url, 'link-url');
    return `[${text}](${url})`;
};

