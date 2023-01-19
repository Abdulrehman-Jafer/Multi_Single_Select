import React, { useEffect, useRef, useState } from "react";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";
import { SelectOption } from "./types"
import { SelectProps } from "./types"


export const Select = ({
  multi,
  selectedOption,
  changeSelectedOption,
  options,
}: SelectProps) => {
  const [showOptionsBox, setShowOptionsBox] = useState<boolean>(false);
  const [mouseOverIndex, setMouseOverIndex] = useState<number>(0);

  const containerRefrence = useRef<HTMLDivElement>(null);

  const clearOption = () => {
    if (multi) {
      changeSelectedOption([]);
    } else {
      changeSelectedOption(undefined);
    }
  };

  const optionSelector = (option: SelectOption) => {
    if (!multi) {
      changeSelectedOption(option);
    } else {
      if (selectedOption.includes(option)) {
        return;
      } else {
        selectedOption.push(option);
      }
    }
  };

  const optionDeselector = (para: SelectOption) => {
    if (multi) {
      changeSelectedOption(selectedOption.filter((value) => value !== para));
    }
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
              selectedOption.map((value) => {
                return (
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                    }}
                    key={value.value}
                    className={`px-1 rounded-sm 
                border border-black flex items-center 
                justify-between hover:bg-red-50 hover:border-red-200`}
                  >
                    <span>{value.label}</span>
                    <span
                      className="translate-y-[3%] text-[1.2em] text-gray-600 cursor-pointer hover:text-black"
                      onClick={(event) => {
                        event.stopPropagation();
                        optionDeselector(value);
                      }}
                    >
                      {<RxCross2 />}
                    </span>
                  </div>
                );
              }) : <span className="text-slate-400">Please Select some tags</span>}
        </div>
      ) : (
        <span className="flex-1">{selectedOption?.label}</span>
      )}
      <button
        onClick={(e) => {
          clearOption();
          e.stopPropagation();
        }}
        className="text-[1.2em] text-gray-600 cursor-pointer hover:text-black"
      >
        {multi && selectedOption.length > 0 ?
          <RxCross2 /> : ""}
      </button>
      <div className="w-[0.1em] bg-gray-500 self-stretch"></div>
      <button className="translate-y-[3%] text-[1.2em] text-gray-600 cursor-pointer hover:text-black">{<MdOutlineArrowDropDown />}</button>
      <ul
        className={`max-h-[15em] overflow-y-auto border 
      border-black rounded-sm w-[100%] 
        absolute left-0 top-[107%] 
      bg-white z-[100] ${showOptionsBox ? "block" : "hidden"}`}
      >
        {options.map((option, index) => (
          <li
            onClick={(event) => {
              event.stopPropagation();
              optionSelector(option);
              setShowOptionsBox(false);
            }}
            onMouseEnter={() => setMouseOverIndex(index)}
            key={option.value}
            className={`px-[.25em] py-[.5em] cursor-pointer 
              ${checkIsSelected(option) ? "bg-blue-500" : ""}
              ${index === mouseOverIndex ? "bg-blue-700" : ""}`}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
