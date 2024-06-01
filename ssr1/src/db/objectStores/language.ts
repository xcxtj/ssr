import type { TypeObjectStore } from "@/db/type";
const webLang:TypeObjectStore={
    keyPath:'id',
    indexs:['name']
}
const languageObjectStore={
    language:webLang
}
export default languageObjectStore