import React from "react";
import Authenticated from "@/Layouts/Layout";
import { Head, usePage } from "@inertiajs/inertia-react";
import ProductCard from "@/Components/Overview/ProductCard";

const products = [
    {
        title: "Hardcover Bindung",
        props: "hardcover",
        imgSrc: "/images/products/Sonstige/DSC08036 (Small).jpg",
        content:
            "Hochwertiges, stabiles Buchcover in drei verschiedenen Materialien (Standard-, Leinen- oder Lederoptik). Im Preis inkludiert ist - wenn gewünscht - eine profesionelle Digitalprägung. Eine Tiefenprägung ist ebenfalls möglich. Beide Prägevarianten sind in Gold und Silber sowohl auf dem Buchdeckel, als auch auf dem Buchrücken möglich.",
        hint: [
            {
                title: "Tiefenprägung",
                content:
                    "Der gewünschte Text und/oder Logo werden im Heißprägeverfahren mittels Prägefolien (Silber oder Gold), Wärme und Presskraft vertieft auf die Mappe appleziert.",
            },
            {
                title: "Digitalprägung",
                content:
                    "Der gewünschte Text und/oder Logo werden mittels digitaler Heißprägung, Prägefolien (Silber oder Gold) und Wärme exakt nach Vorlage flach auf die Mappe gedruckt.",
            },
        ],
    },
    {
        title: "Softcover Bindung",
        imgSrc: "/images/products/Sonstige/DSC08103 (Small).jpg",
        props: "softcover",
        content:
            "Die Softcoverbindung besteht aus einem transparenten Foliendeckblatt, einem passenden Farbstreifen als Vorderseite und einem Standard-Hardcover- Buchrücken und Rückendeckel.",
    },
    {
        title: "Spriral Bindung",
        imgSrc: "/images/products/Sonstige/DSC08095 (Small).jpg",
        props: "spiralbindung",
        content:
            "Die Spiralbindung besteht aus einer transparenten Frontfolie, einem schwarzen Rückkarton, der für Stabilität sorgt, und wird mittels schwarzen Kunststoff- oder silbernen Metallringen gebunden.",
    },
];

export default function ProductOverview(props) {
    const { url } = usePage();
    return (
        <>
            <Head title={props.title} />
            <div className="flex-1 w-full grid place-items-center text-center h-full relative px-8 sm:px-10 pt-10">
                <div className="flex flex-col gap-5 md:items-start lg:w-4/5 xl:w-11/12 mx-auto px-2">
                    <h3 className="text-center text-3xl font-bold">
                        Übersicht
                    </h3>
                    <p className="text-center">
                        Wir bieten drei verschiedene Arten von Bindungen an:
                    </p>
                    <div className="flex flex-col mt-5 gap-10 xl:flex-row">
                        {products.map((product, idx) => (
                            <ProductCard
                                currentUrl={url}
                                product={product}
                                key={idx}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
