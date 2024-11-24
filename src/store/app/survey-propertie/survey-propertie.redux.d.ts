
export type TypeTypeForm = 'text' | 'number' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea';

export default interface Interface {
    _id?: string,
    propertie?: string
    type_form?: TypeTypeForm

    status?: boolean
}