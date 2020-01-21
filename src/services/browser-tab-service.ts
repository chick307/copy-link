export interface Tab {
    title: string;
    url: string;
}

export class BrowserTabService {
    constructor() {
        //
    }

    async getCurrentTab(): Promise<Tab> {
        const tab = await new Promise<chrome.tabs.Tab>((resolve, reject) => {
            chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
                if (chrome.runtime.lastError) {
                    reject(Error(chrome.runtime.lastError.message));
                } else {
                    resolve(tab);
                }
            });
        });
        return {
            title: tab.title || '',
            url: tab.url || '',
        };
    }
}

export default BrowserTabService;
