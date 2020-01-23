export class ClipboardService {
    async writeHtml(data: string, text: string): Promise<void> {
        const iframe = document.createElement('iframe');
        iframe.srcdoc = '';
        iframe.style.cssText = `
            margin: 0 !important;
            border: none !important;
            padding: 0 !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            visibility: hidden !important;
            width: 0 !important;
            height: 0 !important;
            overflow: hidden !important;
        `;
        try {
            await new Promise((resolve, reject) => {
                iframe.onload = resolve;
                iframe.onerror = reject.bind(null, Error());
                document.documentElement.appendChild(iframe);
            });
            const doc = iframe.contentDocument;
            if (doc == null)
                throw Error();
            doc.addEventListener('copy', (e) => {
                if (e.clipboardData == null)
                    return;
                e.clipboardData.setData('text/html', data);
                e.clipboardData.setData('text/plain', text);
                e.preventDefault();
            }, false);
            if (!doc.execCommand('copy'))
                throw Error();
        } finally {
            if (iframe.parentElement)
                iframe.parentElement.removeChild(iframe);
        }
    }

    async writeText(data: string): Promise<void> {
        await navigator.clipboard.writeText(data);
    }
}

export default ClipboardService;
