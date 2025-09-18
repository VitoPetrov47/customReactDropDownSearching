import { useState, useEffect, useRef, useCallback } from "react";
import type { Option } from "@/types/optional";

export const useSearchDropdown = (options: Option[], searchFn?: (query: string) => Promise<Option[]> | Option[]) => {
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
                setFiltered(options.filter(o => o.label.toLowerCase().includes(search.toLowerCase())));
            }
        };
        runSearch();
    }, [search, options, searchFn]);

    const handleToggle = useCallback(() => setIsOpen(prev => !prev), []);
    const handleOpen = useCallback(() => setIsOpen(true), []);
    const handleClose = useCallback(() => {
        setIsOpen(false);
        setSearch("");
    }, []);

    const handleSearchChange = useCallback((value: string) => setSearch(value), []);

    return {
        isOpen,
        search,
        filtered,
        containerRef,
        handleToggle,
        handleOpen,
        handleClose,
        handleSearchChange,
        setFiltered,
        setSearch,
        setIsOpen
    };
};
