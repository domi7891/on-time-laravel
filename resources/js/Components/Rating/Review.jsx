import React from "react";
import { StarIcon } from "@heroicons/react/solid";

function Review({ review }) {
    const formattedDate = new Intl.DateTimeFormat("de-AT", {
        year: "numeric",
        month: "short",
        day: "numeric",
        timeZone: "UTC",
    }).format(new Date(review.date.replaceAll("-", "/")));
    return (
        <div className="grid grid-cols-3 md:flex sm:items-start sm:justify-between py-5 gap-4">
            <div className="flex md:flex-1 items-center gap-4 sm:order-2 col-span-3 sm:row-start-1 sm:col-start-3">
                <div className="flex">
                    {Array.from(Array(5).keys()).map((i) => {
                        return (
                            <StarIcon
                                key={i}
                                className={`w-5 h-5 ${
                                    i < review.rating
                                        ? "text-accent-400"
                                        : "text-gray-300"
                                }`}
                            />
                        );
                    })}
                </div>
                <span className="text-gray-600 text-sm">
                    {review.rating} / 5
                </span>
            </div>
            <div className="sm:order-3 md:flex-1 col-span-full">
                <h3 className="text-gray-700 font-bold mb-2">{review.title}</h3>
                <p className="text-sm text-gray-700">{review.recession}</p>
            </div>
            <div className="col-span-6 sm:row-start-1 sm:col-start-1 sm:order-1 text-sm flex flex-col gap-y-2 md:flex-1 sm:flex-shrink">
                <div className="text-sm flex divide-x md:divide-x-0 md:gap-y-2 md:flex-col md:flex-1 sm:flex-shrink">
                    <span className="pr-3 md:pr-0 font-semibold">
                        {review.name}
                    </span>
                    <span className="pl-3 md:pl-0">{formattedDate}</span>
                </div>
                {review.recommend == 1 && (
                    <div className="text-sm text-gray-500">
                        <span>Der Kunde empfiehlt unsere Seite weiter.</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Review;
