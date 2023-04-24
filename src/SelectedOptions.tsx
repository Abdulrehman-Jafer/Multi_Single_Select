import { RxCross2 } from "react-icons/rx";


type option = { label: string, value: number }
const SelectedOptions = ({ option, optionDeselector }: { option: option, optionDeselector: any }) => {
    return (
        <div
            onClick={(event) => event.stopPropagation()}
            className={`px-1 rounded-sm border border-black flex items-center justify-between hover:bg-red-50 hover:border-red-200`}>
            <span>{option.label}</span>
            <span
                className="translate-y-[3%] text-[1.2em] text-gray-600 cursor-pointer hover:text-black"
                onClick={(event) => {
                    event.stopPropagation();
                    optionDeselector(option);
                }}
            >
                {<RxCross2 />}
            </span>
        </div>
    )
}

export default SelectedOptions
