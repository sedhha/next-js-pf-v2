export type IActionButton = {
    label: string;
    cta: string;
    identifier: string;
}

export interface IProject {
    name: string;
    img: string;
    description: string;
    actionButtons: IActionButton[];
}
