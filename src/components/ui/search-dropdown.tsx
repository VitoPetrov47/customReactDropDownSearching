import { useState, useRef, useEffect } from "react";
import type { Option } from "@/types/optional";
import type { SearchDropdownProps } from "@/types/search-dropdown-props";

export const SearchDropdown: React.FC<SearchDropdownProps> = ({
  options = [],
  value = null,
  onChange,
  placeholder = "Оберіть ваше місто",
  renderOption,
  searchFn,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const [filtered, setFiltered] = useState<Option[]>(options);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
                setSearch("");
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (search.length < 3) {
            setFiltered(options);
            return;
        }

        const runSearch = async () => {
            if (searchFn) {
                const result = await Promise.resolve(searchFn(search));
                setFiltered(result);
            } else {
                const result = options.filter((o) =>
                    o.label.toLowerCase().includes(search.toLowerCase())
                );
                setFiltered(result);
            }
        };
        runSearch();
    }, [search, options, searchFn]);

    const handleSelect = (option: Option) => {
        onChange?.(option);
        setIsOpen(false);
        setSearch("");
    };

    return (
        <div ref={containerRef} className="relative w-[18.4rem]">
            <div
                tabIndex={0}
                onClick={() => setIsOpen((prev) => !prev)}
                className={`flex justify-between items-center border border-gray-300 px-4 py-3 cursor-pointer bg-gray-50
                ${isOpen ? "border-gray-medium rounded-t-[8px]" : "border-gray-300 rounded-[8px]"}`}
            >
                <span className={"text-sm"}>{value?.label || placeholder}</span>
                <span className={`text-xs ml-2 transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}>
                  ▼
                </span>
            </div>

            {isOpen && (
                <div
                    className={`absolute py-[10px] w-full border border-t-0 bg-white shadow-lg z-10
                         rounded-b-[8px] transition-all duration-200 ease-out transform origin-top
                         opacity-100 scale-y-100
                    ${isOpen ? "border-gray-medium" : "border-gray-300"}`}
                    style={{ maxHeight: isOpen ? "400px" : "0px" }}
                >
                    <div className="px-2 py-1 border border-[#D1D5DB99] mx-[10px] mb-3 rounded-[6px]">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Пошук..."
                            className="w-full outline-none placeholder-gray-light"
                            autoFocus
                        />
                    </div>

                    <ul className="max-h-[7rem] overflow-y-auto space-y-1">
                        {filtered.length > 0 ? (
                            filtered.map((option) => {
                                const selected = value?.value === option.value;
                                return (
                                    <li
                                        key={option.value}
                                        onClick={() => handleSelect(option)}
                                        className={`text-sm px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                                            selected ? "bg-gray-200 font-medium" : ""
                                        }`}
                                    >
                                        {renderOption ? renderOption(option, selected) : option.label}
                                    </li>
                                );
                            })
                        ) : (
                            <li className="px-3 py-2 text-gray-400">Нічого не знайдено</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
};