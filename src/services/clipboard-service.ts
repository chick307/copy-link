export class ClipboardService {
    writeText(data: string) {
        navigator.clipboard.writeText(data);
    }
}

export default ClipboardService;
