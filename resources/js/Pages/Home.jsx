import React, { useContext, useState } from "react";
import { Link, Head } from "@inertiajs/inertia-react";
import Layout from "@/Layouts/Layout";
import ToastNotification from "@/Components/Navbar/Notification/ToastNotification";
import ToastContext from "@/Components/context/ToastContext";
import CartContext from "@/Components/context/CartContext";
import Button from "@/Components/Button";
import State from "@/Components/Home/State";
import NavigationContext from "@/Components/context/NavigationContext";
import CustomLink from "@/Components/CustomLink";
import { get } from "axios";

const Home = (props) => {
    const { toasts, createToast } = useContext(ToastContext);

    const add = () => {
        let a = new Uint32Array(3);
        window.crypto.getRandomValues(a);
        const id = (
            performance.now().toString(36) +
            Array.from(a)
                .map((A) => A.toString(36))
                .join("")
        ).replace(/\./g, "");
        const product = {
            productId: id,
            type: "Hardcover",
            material: "Leder",
            color: "Schwarz",
            print: "Einseitig",
            paper_weight: "100g",
            quantity: Math.round(Math.random() * 5),
            basePrice: 26,
            totalPriceExtras: 3,
            totalUnitPrice: 29,
            extras: { weight: 3 },
            equipment: "",
            equipmentPriceTotal: 0,
            total: 29,
            images: {
                front: "images/products/Produktfotos Hardcover Leder/Small/hardcover_leder_front_black.jpg",
            },
            pdf: {
                name: "arbeit_zum_drucken.pdf",
                displayName: "Dokument1.pdf",
            },
            folderName: "20220708_a15d0d98fedf11ec95d502420a80ff02",
            pages: 1,
            embossing: {
                color: "Gold",
                method: "Digitalprägung",
                position: "Buchdeckel",
                front: {
                    first_line: {
                        text: "DIPLOMARBEIT",
                        size: "9mm",
                    },
                    second_line: {
                        text: "5AHIF - 2022",
                        size: "5.5mm",
                    },
                },
            },
        };
        addToCart(product);

        // get("/add", {
        //     params: {
        //         pages: 75,
        //         type: "Softcover",
        //     },
        // }).then((res) => console.log(res));
    };

    return (
        <>
            <Head title="OnTime | Ihr schneller Buchdruck" />
            {/* <button
                onClick={() =>
                    // createToast(
                    //     "New Product",
                    //     "Neues Produkt zum Warenkorb hinzugefügt",
                    //     true
                    // )
                    addToCart({
                        basePrice: 45,
                        quantity: 2,
                        total: 90,
                        totalUnitPrice: 45,
                    })
                }
            >
                Open Toast
            </button> */}
            <div className="w-full text-center h-full relative px-8 sm:px-10">
                <div className="sm:w-11/12 mx-auto max-w-7xl mt-12 ">
                    <img
                        src="/images/products/Sonstige/Bild Home.jpg"
                        onClick={() => add()}
                    />
                </div>
                <div className="sm:max-w-xl lg:max-w-5xl sm:text-left mx-auto lg:px-10">
                    <div className="flex flex-col mt-8 xl:mt-16 lg:flex-row gap-5 lg:gap-20 lg:justify-center ">
                        <div className="lg:w-6/12 2xl:w-8/12">
                            <p className="text-2xl lg:text-3xl font-bold uppercase">
                                <CustomLink href="/companies">
                                    Unternehmen
                                </CustomLink>
                            </p>
                            <p className="text-lg mt-3.5 font-semibold text-gray-800 2xl:text-xl">
                                Sie erhalten handgefertigte - auf Wunsch auch
                                personalisierte - Premiummappen für Ihren
                                professionellen Auftritt. Unabhängig welcher
                                Berufsgruppe Sie angehören, wir erstellen Ihnen
                                für Ihren Bedarf das passende Angebot.
                            </p>
                        </div>
                        <div className="lg:mt-0 rounded overflow-hidden max-w-4xl aspect-video">
                            <img
                                src="/images/products/produktFotosHomeSchuler/Homepage/Unternehmen.jpg"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-14 lg:mt-32 lg:flex-row-reverse gap-5 lg:gap-20 lg:justify-center sm:max-w-xl lg:max-w-5xl ">
                        <div className="lg:w-6/12 2xl:w-8/12">
                            <p className="text-2xl lg:text-3xl font-bold uppercase">
                                <CustomLink href="/universities">
                                    Universitäten und Fachhochschulen
                                </CustomLink>
                            </p>
                            <p className="text-lg mt-3.5 font-semibold text-gray-800 2xl:text-xl">
                                Dissertation, Doktor-, Master-, Bachelor- oder
                                Diplomarbeit - wir binden alles sicher und
                                schnell.
                            </p>
                        </div>
                        <div className="lg:mt-0 rounded overflow-hidden max-w-4xl aspect-video">
                            <img
                                src="/images/products/produktFotosHomeSchuler/Homepage/Studenten.jpg"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center mt-14 lg:mt-32 lg:flex-row gap-5 lg:gap-20 lg:justify-center sm:max-w-xl lg:max-w-5xl ">
                        <div className="lg:w-6/12 2xl:w-8/12">
                            <p className="text-2xl lg:text-3xl font-bold uppercase">
                                <CustomLink href="/schools">
                                    Allgemeine und Berufsbildende Schulen
                                </CustomLink>
                            </p>
                            <p className="text-lg mt-3.5 font-semibold text-gray-800 2xl:text-xl">
                                Die VWA bzw. Diplomarbeit schnell und sicher vor
                                die Schule geliefert.
                            </p>
                        </div>
                        <div className="lg:mt-0 rounded overflow-hidden max-w-4xl aspect-video">
                            <img
                                src="/images/products/produktFotosHomeSchuler/Homepage/Schueler.jpg"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
                <div className="w-full sm:max-w-xl lg:max-w-5xl mx-auto lg:px-10 mt-14 lg:mt-20">
                    <img
                        src="/images/products/produktFotosHomeSchuler/Homepage/Gruppe.jpg"
                        className="w-full h-full object-cover rounded"
                    />
                </div>
                <div className="w-full flex flex-col lg:flex-row items-center lg:items-start mt-10 gap-5 sm:max-w-xl lg:max-w-5xl mx-auto">
                    <State
                        title="Erreichbarkeit"
                        subtitle="24 / 7, Rund um die Uhr"
                        content="Wir drucken und binden für unsere Kunden an jedem Tag der Woche (auch Sonn- und Feiertagen, sowie
                            schulfreien Tagen)."
                    />
                    <State
                        title="Schnelligkeit"
                        subtitle="Heute bestellt - Morgen geliefert"
                        content="Jeder Auftrag wird sofort bearbeitet und gewissenhaft erledigt."
                    />
                    <State
                        title="Qualität + Preis"
                        subtitle="Bestpreis Garantie"
                        content="Wir garantieren personalisierte Mappen in Premiumqualität zum Spitzenpreis."
                    />
                </div>
            </div>
        </>
    );
};

export default Home;
