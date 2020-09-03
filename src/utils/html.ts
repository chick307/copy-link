export const escape = (text: string, { quot = false } = {}) => {
    const div = document.createElement('div');
    div.textContent = text;
    if (quot)
        return div.innerHTML.replace(/"/g, '&quot;');
    return div.innerHTML;
};
