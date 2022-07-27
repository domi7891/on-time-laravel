import React, { useContext, useEffect } from "react";
import Dropdown from "@/Components/Form/Dropdown";
import ProductContext from "@/Components/context/ProductContext";
import { formatePrice } from "@/utils/helpers";

const vals = Array(10)
    .fill()
    .map((_, i) => i + 1);

function Equipment() {
    const { product, totals, changeEquipment } = useContext(ProductContext);

    const changeEqp = (equipment, qty) => {
        const selected = product.equipment[equipment].selected;

        changeEquipment(equipment, selected, qty);
    };

    const toggleEqp = (equipment, selected) => {
        const qty = product.equipment[equipment].quantity;

        changeEquipment(equipment, selected, qty);
    };

    return (
        <div className="px-2 space-y-6">
            <label htmlFor="cd" className="pr-4 w-full flex items-start gap-8">
                <div className="flex items-center h-5">
                    <input
                        id="cd"
                        name="cd"
                        defaultChecked={product.equipment["CD"].selected}
                        onChange={(e) => toggleEqp("CD", e.target.checked)}
                        type="checkbox"
                        className="mt-1 focus:border-solid focus:border focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 h-4 w-4 text-accent-400 border-gray-300 rounded"
                    />
                </div>
                <div className="text-left flex-1">
                    <span className="text-lg font-medium text-gray-700">
                        CD mit passender Hülle
                    </span>
                    <p className="text-gray-500 text-sm">
                        (wird in der Arbeit ganz hinten eingeklebt)
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <div className="relative">
                            <Dropdown
                                contentClasses="flex flex-col divide-y w-20"
                                width="20"
                                maxHeight="40"
                                change={(qty) => changeEqp("CD", qty)}
                                childArray={vals}
                            >
                                <Dropdown.Trigger className="py-0.5">
                                    <span>
                                        {product.equipment["CD"].quantity}
                                    </span>
                                </Dropdown.Trigger>
                            </Dropdown>
                        </div>
                        <span>
                            + {formatePrice(totals.equipment["CD"].total)}
                        </span>
                    </div>
                </div>
            </label>
            <label htmlFor="usb" className="pr-4 w-full flex items-start gap-8">
                <div className="flex items-center h-5">
                    <input
                        id="usb"
                        name="usb"
                        defaultChecked={product.equipment["USB"].selected}
                        onChange={(e) => toggleEqp("USB", e.target.checked)}
                        type="checkbox"
                        className="mt-1 focus:border-solid focus:border focus:border-accent-400/50 focus:ring focus:ring-accent-400 focus:ring-opacity-25 h-4 w-4 text-accent-400 border-gray-300 rounded"
                    />
                </div>
                <div className="text-left flex-1">
                    <span className="text-lg font-medium text-gray-700">
                        USB Stick mit passender Tasche
                    </span>
                    <p className="text-gray-500 text-sm">
                        (wird deiner Betsellung zum einkleben bereit beigelegt)
                    </p>
                    <div className="flex justify-between items-center mt-4">
                        <div className="relative">
                            <Dropdown
                                contentClasses="flex flex-col divide-y w-20"
                                width="20"
                                maxHeight="40"
                                change={(qty) => changeEqp("USB", qty)}
                                childArray={vals}
                            >
                                <Dropdown.Trigger className="py-0.5">
                                    <span>
                                        {product.equipment["USB"].quantity}
                                    </span>
                                </Dropdown.Trigger>
                            </Dropdown>
                        </div>
                        <span>
                            + {formatePrice(totals.equipment["USB"].total)}
                        </span>
                    </div>
                </div>
            </label>
        </div>
    );
}

export default Equipment;
