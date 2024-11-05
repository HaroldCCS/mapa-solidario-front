export default interface Interface {
    _id: string,
    title: string
    description: string
    status: boolean

    user_creator: string

    day: Date
    ubication: string;
    location: number[]
}