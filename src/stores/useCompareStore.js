import create from "zustand";
import { combine } from "zustand/middleware";

const useCompareStore = create(
    combine(
        {
            compare1 : {},
            compare2 : {},
            selected : {}
        },
        (set, get) => ({
            setSelected: (newSelected) => {
                return set(() => {
                    return { selected: newSelected };
                })
            },
            setCompare1: (newCompare1) => {
                return set(() => {
                    return { compare1: newCompare1 };
                })
            },
            setCompare2: (newCompare2) => {
                return set(() => {
                    return { compare2: newCompare2 };
                })
            },
        })
    )
);

export default useCompareStore;
