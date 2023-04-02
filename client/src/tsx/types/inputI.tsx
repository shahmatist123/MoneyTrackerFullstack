export interface P {
    type: string,
    placeholder?: string,
    name?: string,
    onChangeInput?: (name: string | undefined, value: number|string|number[]) => void,
    onSubmit?: () => void,
    mask?: string,
    value?: string,
    onClick?: () => void,
    onChange?: (value: any) => void,
    checked?: boolean,
    values?: any
}