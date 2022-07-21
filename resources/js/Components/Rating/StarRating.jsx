import React, { useRef, useState } from "react";
import { StarIcon } from "@heroicons/react/outline";
import { StarIcon as StarSolid } from "@heroicons/react/solid";

function StarRating() {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const input = useRef();

    const formatText = () => {
        switch (hoverRating) {
            case 0:
                return "Bitte Auswählen";
            case 1:
                return "Sehr unzufrieden";
            case 2:
                return "Könnte besser sein";
            case 3:
                return "Ist okay";
            case 4:
                return "Ziemlich gut";
            case 5:
                return "Perfekt";
        }
    };

    const changeRating = (val) => {
        setRating(val);
        input.current.value = val;
    };

    const hoverChangeRating = (e, val) => {
        setHoverRating(val + 1);
    };
    return (
        <div className="w-min mt-2 relative mx-auto sm:mx-0">
            <p>{formatText()}</p>
            <div
                className="mt-2 flex justify-center sm:justify-start w-min"
                onMouseOut={() => setHoverRating(rating)}
            >
                {Array.from(Array(5).keys()).map((val, idx) => {
                    return (
                        <div
                            key={idx}
                            className="pr-2"
                            onMouseOver={(e) => hoverChangeRating(e, val)}
                            onClick={() => changeRating(val + 1)}
                        >
                            <StarSolid
                                className={`w-8 h-8 cursor-pointer ${
                                    val < rating || val < hoverRating
                                        ? "text-accent-400"
                                        : "text-gray-300"
                                }`}
                            />
                        </div>
                    );
                })}
            </div>
            <input
                type="number"
                name="rating"
                id="rating"
                className="sr-only right-1/2 transform -translate-x-1/2"
                required
                ref={input}
            />
        </div>
    );
}

export default StarRating;
