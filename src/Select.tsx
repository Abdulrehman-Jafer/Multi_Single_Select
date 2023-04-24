import { useEffect, useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SelectOption, SelectProps } from "./types"
import SelectedOptions from "./SelectedOptions";
import OptionsList from "./OptionsList";


export const Select = ({
  multi,
  selectedOption,
  changeSelectedOption,
  options,
}: SelectProps) => {
  const [showOptionsBox, setShowOptionsBox] = useState<boolean>(false);
  const [mouseOverIndex, setMouseOverIndex] = useState<number>(0);

  const containerRefrence = useRef<HTMLDivElement>(null);

  const clearOptions = () => {
    multi ? changeSelectedOption([]) : changeSelectedOption(undefined);
  };

  const optionSelector = (option: SelectOption) => {
    if (multi) {
      if (selectedOption.includes(option)) return;
      else selectedOption.push(option);
    } else {
      changeSelectedOption(option);
    }
  };

  const optionDeselector = (para: SelectOption) => {
    if (multi) return changeSelectedOption(selectedOption.filter((value) => value !== para));
  };

  useEffect(() => {
    setMouseOverIndex(0);
  }, [showOptionsBox]);

  useEffect(() => {
    const KeyBoardEvent = (event: KeyboardEvent) => {
      if (event.target !== containerRefrence.current) return;
      switch (event.code) {
        case "Enter":
        case "Space":
          setShowOptionsBox((old) => !old);
          optionSelector(options[mouseOverIndex]);
          break;
        case "ArrowUp":
        case "ArrowDown":
          if (!showOptionsBox) {
            setShowOptionsBox(true);
            break;
          }
          const newIndex =
            mouseOverIndex + (event.code === "ArrowDown" ? 1 : -1);
          if (newIndex >= 0 && newIndex != options.length) {
            setMouseOverIndex(newIndex);
          }
          break;
        case "Escape":
          setShowOptionsBox(false);
          break;
      }
    };
    containerRefrence.current?.addEventListener("keydown", KeyBoardEvent);
    return () => {
      containerRefrence.current?.removeEventListener("keydown", KeyBoardEvent);
    };
  }, [mouseOverIndex, showOptionsBox]);

  const checkIsSelected = (option: SelectOption) => {
    return multi
      ? selectedOption.includes(option)
      : option.label === selectedOption?.label;
  };

  return (
    <div
      ref={containerRefrence}
      onBlur={() => setShowOptionsBox(false)}
      onClick={() => {
        setShowOptionsBox(true);
      }}
      tabIndex={0}
      className={`border-2
       relative w-[25em] min-h-[1.5em] 
       border-solid border-zinc-500 
       flex items-center gap-[.5em] p-[.5em]
       rounded-md outline-none focus:border-blue-600`}
    >
      {multi ? (
        <div className="flex-1 flex flex-wrap gap-2">
          {
            selectedOption.length > 0 ?
              selectedOption.map((option) => {
                return (
                  <SelectedOptions key={crypto.randomUUID()} option={option} optionDeselector={optionDeselector} />
                );
              }) : <span className="text-slate-400">You do not have any selected tag!</span>}
        </div>
      ) : (
        <span className="flex-1">{selectedOption?.label}</span>
      )}
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className="text-[1.2em] text-gray-600 cursor-pointer hover:text-black"
      >
        {multi && selectedOption.length > 0 && <RxCross2 />}
      </button>
      <div className="w-[0.1em] bg-gray-500 self-stretch"></div>
      <button className="translate-y-[3%] text-[1.2em] text-gray-600 cursor-pointer hover:text-black">{<MdOutlineArrowDropDown />}</button>
      <OptionsList
        checkIsSelected={checkIsSelected}
        mouseOverIndex={mouseOverIndex}
        optionSelector={optionSelector}
        setMouseOverIndex={setMouseOverIndex}
        setShowOptionsBox={setShowOptionsBox}
        showOptionsBox={showOptionsBox}
        options={options} />
    </div>
  );
};
