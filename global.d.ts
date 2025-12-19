// global.d.ts
export {};

declare global {
    interface Window {
        Elma365WebForms: {
            form: (formId: string, options?: { container?: string }) => void;
        };
    }
}
