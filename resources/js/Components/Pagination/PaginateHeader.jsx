import React from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/outline";
import { Link } from "@inertiajs/inertia-react";

function PaginateHeader({ pagination, className }) {
    const { links } = pagination;
    const activeLink = links
        .map((link, idx) => {
            if (link.active) return idx;
            return null;
        })
        .filter((i) => i != null)[0];

    const formatLabel = (label) => {
        return label.replace("&laquo; ", "").replace(" &raquo;", "");
    };

    return (
        <div
            className={`w-full mx-auto grid grid-cols-6 sm:flex justify-between border-t gap-y-1 mb-5 ${className}`}
        >
            <Link
                preserveScroll
                href={links[0].url}
                className={`col-span-2 col-start-1 flex items-center gap-2 cursor-pointer font-semibold sm:w-24 row-start-2 ${
                    links[0].url
                        ? "text-gray-600"
                        : "pointer-events-none text-gray-300"
                }`}
            >
                <ArrowLeftIcon className="w-4 h-4" />
                <span className="text-base">{formatLabel(links[0].label)}</span>
            </Link>
            <div className="col-span-6 flex items-center justify-center gap-2 text-gray-600">
                {links.map((link, idx) => {
                    if (idx == 0 || idx == links.length - 1) return null;
                    if (
                        idx == 1 ||
                        idx == links.length - 2 ||
                        link.active ||
                        (activeLink == 1 && idx == 2) ||
                        (activeLink == links.length - 2 &&
                            idx == links.length - 3) ||
                        idx == activeLink + 1 ||
                        idx == activeLink - 1 ||
                        (activeLink < 4 && idx <= 4) ||
                        (activeLink > links.length - 5 &&
                            idx >= links.length - 5)
                    ) {
                        return (
                            <Link
                                key={idx}
                                preserveScroll
                                href={link.url}
                                className={`px-4 py-3 relative ${
                                    link.active
                                        ? "after:w-full after:h-0.5 after:bg-accent-400 after:absolute after:-top-px after:left-0"
                                        : ""
                                }`}
                            >
                                <span className="text-sm">{link.label}</span>
                            </Link>
                        );
                    } else if (
                        (activeLink < 4 && idx == 5) ||
                        (activeLink > links.length - 5 &&
                            idx == links.length - 6) ||
                        idx == activeLink - 2 ||
                        idx == activeLink + 2
                    ) {
                        return <div key={idx}>...</div>;
                    }
                    return null;
                })}
            </div>
            <Link
                preserveScroll
                href={links[links.length - 1].url}
                className={`col-start-6 col-span-2 flex items-center justify-end gap-2 cursor-pointer font-semibold sm:w-24 row-start-2 ${
                    links[links.length - 1].url
                        ? "text-gray-600"
                        : "pointer-events-none text-gray-300"
                }`}
            >
                <span className="text-base">
                    {formatLabel(links[links.length - 1].label)}
                </span>
                <ArrowRightIcon className="w-4 h-4" />
            </Link>
        </div>
    );
}

export default PaginateHeader;
