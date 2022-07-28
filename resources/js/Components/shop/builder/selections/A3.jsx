import ProductContext from "@/Components/context/ProductContext";
import NumberInput from "@/Components/Form/NumberInput";
import React, { useContext, useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/outline";

function A3({ from, to, idx, max }) {
    const [fromVal, setFrom] = useState(from);
    const [toVal, setTo] = useState(to);
    const { changeA3 } = useContext(ProductContext);

    useEffect(() => {
        console.log("From, To changed");
        setFrom(from);
        setTo(to);
    }, [from, to]);

    const changeFrom = (e) => {
        setFrom(e.target.value);
    };

    const changeTo = (e, i) => {
        setTo(e.target.value);
    };

    const remove = (idx) => {
        changeA3(idx, null, null, true);
    };

    const change = (idx, fr, t, isFrom = true) => {
        let fVal = parseInt(fr);
        let tVal = parseInt(t);

        if (fVal >= tVal) {
            if (fVal < max) {
                tVal = fVal + 1;
                setTo(tVal);
            } else {
                fVal = tVal - 1;
                setFrom(fVal);
            }
        }

        changeA3(idx, fVal, tVal);
    };

    const handleBlur = (idx, isFrom = true) => {
        let val = isFrom ? fromVal : toVal;
        if (val == "" || val < 1 || val > max) {
            if (val == "" || val < 1) val = 1;
            else if (val > max) val = max;

            if (isFrom) setFrom(val);
            else setTo(val);
        }

        change(idx, fromVal, toVal, isFrom);
    };

    const handleStep = (idx, step, isFrom = true) => {
        if (isFrom) {
            setFrom(parseInt(fromVal) + step);
            change(idx, parseInt(fromVal) + step, toVal, isFrom);
        } else {
            setTo(parseInt(toVal) + step);
            change(idx, fromVal, parseInt(toVal) + step, isFrom);
        }
    };

    return (
        <div key={idx} className="flex justify-start items-center gap-3 group">
            <div className="flex justify-start items-center gap-3">
                <span>von</span>
                <NumberInput
                    inputClass="!w-full !text-center"
                    containerClass="w-24"
                    min={1}
                    max={max}
                    value={fromVal}
                    required={true}
                    handleChange={(e) => changeFrom(e)}
                    handleBlur={(e) => handleBlur(idx)}
                    handleStep={(step) => handleStep(idx, step)}
                />
            </div>
            <div className="flex justify-start items-center gap-3">
                <span>bis</span>
                <NumberInput
                    inputClass="!w-full !text-center"
                    containerClass="w-24"
                    min={1}
                    max={max}
                    value={toVal}
                    required={true}
                    handleChange={(e) => changeTo(e)}
                    handleBlur={() => handleBlur(idx, false)}
                    handleStep={(step) => handleStep(idx, step, false)}
                />
            </div>
            {idx > 0 && (
                <button onClick={() => remove(idx)}>
                    <TrashIcon className="cursor-pointer text-red-600 w-5 h-5" />
                </button>
            )}
        </div>
    );
}

export default A3;
