import React from "react";
import CustomLink from "../CustomLink";
import GoUp from "./GoUp";

function Footer() {
    return (
        <div className="relative w-full bg-accent-400 md:bg-white md:border-t-2 md:border-accent-400 mt-14 py-5">
            <div className="max-w-5xl mx-auto flex flex-col items-center gap-5 md:gap-3">
                <div className="flex flex-col items-center gap-5 md:flex-row md:justify-between w-full px-10">
                    <CustomLink href="/impressum">
                        <span className="uppercase text-black font-semibold">
                            Impressum
                        </span>
                    </CustomLink>
                    <a
                        href="/downloads/AGB-onTime-eU.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="uppercase text-black font-semibold"
                    >
                        AGB
                    </a>
                    <CustomLink href="/impressum">
                        <span className="uppercase text-black font-semibold">
                            Versandkostenübersicht
                        </span>
                    </CustomLink>
                    <CustomLink href="/contact">
                        <span className="uppercase text-black font-semibold">
                            Kontakt
                        </span>
                    </CustomLink>
                    <a
                        href="/downloads/Sammeltermine_onTime.pdf"
                        target="_blank"
                        rel="noreferrer"
                        className="uppercase text-black font-semibold"
                    >
                        Sammeltermine
                    </a>
                </div>
                <div className="flex flex-col items-center font-bold md:flex-row md:gap-2">
                    <span className="">
                        ©Copyright 2022{" "}
                        <a href="https://ontime-store.at">ontime-store.at</a>
                    </span>
                    <span className="hidden md:block">|</span>
                    <span className="">
                        Realized by{" "}
                        <a
                            href="https://www.nossal.at"
                            target="_blank"
                            rel="noreferrer external"
                        >
                            Dominik Nossal
                        </a>
                    </span>
                </div>
            </div>
            <GoUp />
        </div>
    );
}

export default Footer;
