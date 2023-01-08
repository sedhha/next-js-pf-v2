export interface IPopup {
    type: 'error' | 'success';
    title: string;
    description: string;
    timeout: number;
}