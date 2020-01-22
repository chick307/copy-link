export class ClipboardService {
    async writeText(data: string): Promise<void> {
        await navigator.clipboard.writeText(data);
    }
}

export default ClipboardService;
