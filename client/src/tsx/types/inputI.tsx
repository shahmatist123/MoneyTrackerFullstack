export interface P {
    type: string,
    placeholder: string,
    name: string,
    onChangeInput?: (name: string, value: number|string|number[]) => void,
    onSubmit?: () => void,
    mask?: string;
}