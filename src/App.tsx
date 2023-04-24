import { useState } from "react";
import { Select } from "./Select";
import { SelectOption } from "./types";

function App() {
  const opt1: SelectOption = { label: "First", value: 1 };
  const opt2: SelectOption = { label: "Second", value: 2 };
  const opt3: SelectOption = { label: "Third", value: 3 };
  const opt4: SelectOption = { label: "Fourth", value: 4 };
  const opt5: SelectOption = { label: "Fifth", value: 5 };

  const OPTIONS: SelectOption[] = [opt1, opt2, opt3, opt4, opt5];

  const [selectedOption, setSelectedOption] = useState(OPTIONS[0]);

  const [multiSelectOption, setMultiSelectOption] = useState<SelectOption[]>([]);

  return (
    <div className="App">
      {
        <>
          <div className="flex p-2 flex-col gap-5 max-w-[620px]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-3xl flex-1">Multi-Select:</span>
              <Select
                multi={true}
                options={OPTIONS}
                selectedOption={multiSelectOption}
                changeSelectedOption={(selectedOption: SelectOption[]) => [
                  setMultiSelectOption(selectedOption),
                ]}
              />
            </div>
            <div className="flex items-center flex-wrap gap-2">
              <span className="text-3xl flex-1 ">Single-Select:</span>
              <Select
                options={OPTIONS}
                selectedOption={selectedOption}
                changeSelectedOption={(selectedOption) => setSelectedOption(selectedOption!)}
              />
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
