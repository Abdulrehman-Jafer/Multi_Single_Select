import { Dispatch, SetStateAction } from 'react'
import { SelectOption } from './types';


type ofOptionList = {
    options: SelectOption[],
    optionSelector: (option: SelectOption) => void,
    setShowOptionsBox: Dispatch<SetStateAction<boolean>>,
    setMouseOverIndex: Dispatch<SetStateAction<number>>,
    checkIsSelected: (option: SelectOption) => boolean,
    showOptionsBox: boolean,
    mouseOverIndex: number
}
const OptionsList = ({ options, optionSelector, setShowOptionsBox, setMouseOverIndex, checkIsSelected, showOptionsBox, mouseOverIndex }: ofOptionList) => {
    return (
        <ul
            className={`max-h-[15em] overflow-y-auto border border-black rounded-sm w-[100%] absolute left-0 top-[107%] bg-white z-[100] ${showOptionsBox ? "block" : "hidden"}`}>
            {options.map((option: any, index: any) => (
                <li
                    onClick={(event) => {
                        event.stopPropagation();
                        optionSelector(option);
                        setShowOptionsBox(false);
                    }}
                    onMouseEnter={() => setMouseOverIndex(index)}
                    key={crypto.randomUUID()}
                    className={`px-[.25em] py-[.5em] cursor-pointer ${checkIsSelected(option) && "bg-blue-400"} ${index === mouseOverIndex && "bg-blue-500"}`}>
                    {option.label}
                </li>
            ))}
        </ul>
    )
}

export default OptionsList
