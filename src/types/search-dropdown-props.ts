import type {Option} from "./optional";
import React from "react";

export type SearchDropdownProps = {
    options?: Option[];
    value?: Option | null;
    onChange?: (option: Option | null) => void;
    placeholder?: string;
    renderOption?: (option: Option, isSelected: boolean) => React.ReactNode;
    renderValue?: (option: Option | null) => React.ReactNode;
    searchFn?: (query: string) => Promise<Option[]> | Option[];
};
