import { MyExhibit } from "./exhibit"

export type MyExhibitResponse = {
    data: MyExhibit[]
    total: number
    page: number
    lastPage: number
}