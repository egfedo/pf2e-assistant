import { File } from "./file.ts";

export interface Folder {
    label: string;
    children: Folder[];
    entries: File[];
}
