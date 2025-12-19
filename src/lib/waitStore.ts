type FilePayload = { buffer: Buffer; mime: string; filename: string };

declare global {
    var __fileStore__:
        | {
              resolver: ((f: FilePayload) => void) | null;
              lastFile: FilePayload | null;
          }
        | undefined;
}

if (!globalThis.__fileStore__) {
    globalThis.__fileStore__ = { resolver: null, lastFile: null };
}
const STORE = globalThis.__fileStore__;

export function waitForFile(): Promise<FilePayload> {
    if (STORE.lastFile) {
        const f = STORE.lastFile;
        STORE.lastFile = null;
        return Promise.resolve(f);
    }
    return new Promise((resolve) => {
        STORE.resolver = resolve;
    });
}

export function pushFile(file: FilePayload) {
    if (STORE.resolver) {
        STORE.resolver(file);
        STORE.resolver = null;
    } else {
        STORE.lastFile = file;
    }
}
