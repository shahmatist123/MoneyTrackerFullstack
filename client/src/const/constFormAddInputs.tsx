import {categorySelector} from "../tsx/pages/categorySlice";

const formAddInputs = [
    {
        type: "text",
        placeholder: "Краткое описание",
        name: "msg"
    },
    {
        type: "inputSumm",
        placeholder: "Сумма",
        name: "summ"
    },
    {
        type: "dropDownR",
        placeholder: "Категория",
        name: "category",
        values: categorySelector
    },
    {
        type: "submit",
        placeholder: "Отправить",
        name: "send"
    },
]
export default formAddInputs;