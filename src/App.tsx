import { useState } from "react";
import { Select } from "./Select";
import { SelectOption } from "./types";

function App() {
  const option1: SelectOption = {
    label: "First",
    value: 1,
  };

  const option2: SelectOption = {
    label: "Second",
    value: 2,
  };
  const option3: SelectOption = {
    label: "Third",
    value: 3,
  };
  const option4: SelectOption = {
    label: "Fourth",
    value: 4,
  };
  const option5: SelectOption = {
    label: "Fifth",
    value: 5,
  };

  const options: SelectOption[] = [option1, option2, option3, option4, option5];
  const options2: SelectOption[] = [option1];

  const [selectedOption, setSelectedOption] = useState<
    SelectOption | undefined
  >(options[0]);

  const [multiSelectOption, setMultiSelectOption] =
    useState<SelectOption[]>(options2);

  return (
    <div className="App">
      {
        <>
          <div className="flex p-2 flex-col gap-5 max-w-[620px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-3xl flex-1">Multi-Select:</span>
              <Select
                multi={true}
                options={options}
                selectedOption={multiSelectOption}
                changeSelectedOption={(selectedOption: SelectOption[]) => [
                  setMultiSelectOption(selectedOption),
                ]}
              />
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-3xl flex-1 ">Single-Select:</span>
              <Select
                options={options}
                selectedOption={selectedOption}
                changeSelectedOption={(selectedOption) =>
                  setSelectedOption(selectedOption)
                }
              />
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
