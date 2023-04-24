export type SelectOption = {
    label: string;
    value: any;
};
export type SingleSelectProps = {
    multi?: false;
    selectedOption?: SelectOption;
    changeSelectedOption: (value: SelectOption | undefined) => void;
};
export type MultiSelectProps = {
    multi: true;
    selectedOption: SelectOption[];
    changeSelectedOption: (value: SelectOption[]) => void;
};
export type SelectProps = {
    options: SelectOption[];
} & (SingleSelectProps | MultiSelectProps);
