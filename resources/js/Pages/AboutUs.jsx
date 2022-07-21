import CustomLink from "@/Components/CustomLink";
import { Head, Link } from "@inertiajs/inertia-react";
import React from "react";

function AboutUs() {
    return (
        <>
            <Head title="OnTime | Über uns" />
            <div className="max-w-7xl mx-auto w-full h-full relative lg:px-10 pt-5 sm:pt-14 space-y-10">
                <div className="w-full">
                    <video controls preload="auto" className="object-fill">
                        <source src="/images/OnTime-Ad.mp4" type="video/mp4" />
                        Ihr Browser kann dieses Video leider nicht abspielen.
                    </video>
                </div>
                <div className="mt-10 px-10 text-center space-y-5 md:text-left">
                    <p>
                        Unsere Geschichte begann, als wir selbst noch Schüler
                        waren ...
                    </p>
                    <p>
                        Mit jedem Jahr stiegen die Anforderungen. Zum
                        alltäglichen Schulstress wurde uns im letzten Schuljahr
                        die Königsdisziplin "Abschlussarbeit" auferlegt. Dann
                        hat sich auch noch das Binden, als wesentlich
                        komplizierter, als im Vorfeld gedacht, erwiesen.
                        Zusätzlich zum Zeitdruck, wurden wir mit hohen Preisen
                        konfrontiert, um ordentlich gebundene Abschlussarbeiten
                        fristgerecht zu erhalten.
                    </p>

                    <p>
                        Genau aus diesem Grund kamen wir auf die Idee, ein
                        Gesamtangebot zu erstellen, welches die durchgehende
                        Erreichbarkeit, Schnelligkeit und Qualität zu einem
                        fairen Preis kombiniert.
                    </p>

                    <p>Von Maturanten für Maturanten.</p>
                    <p>
                        Im Zuge unserer Tätigkeit haben wir jedoch auch privaten
                        Bedarf festgestellt, in Form von Erinnerungsmappen,
                        Kinderzeichnungen, Jahresbücher für Pärchen oder aber
                        auch Comics, die Sammler gebunden in personalisierten
                        Mappen aufbewahren möchten. Beispiele hierzu finden Sie
                        in unserer{" "}
                        <CustomLink href="/gallery" className="font-bold">
                            Galerie
                        </CustomLink>
                        .
                    </p>
                    <p>
                        In weiterer Folge, wollten wir unser Angebot auch
                        Unternehmen zugänglich machen. Denn in jedem Büro,
                        ungeachtet welcher Branche, werden Unterlagen in
                        gebundener Form benötigt, wie beispielsweise
                        Bedienungsanleitungen, notarielle Urkunden, Prospekte,
                        Beschreibungen, Firmenpräsentationen, Projektunterlagen,
                        Jahresberichte und dergleichen. In unserer{" "}
                        <CustomLink href="/gallery" className="font-bold">
                            Galerie
                        </CustomLink>{" "}
                        haben wir einige Beispiele von Kunden zusammengestellt.
                    </p>
                    <p>
                        Unsere Philosophie ist es, alle Aufträge zur vollsten
                        Kundenzufriedenheit zu erfüllen. Wir möchten jedem
                        Kunden mit unseren personalisierten Mappen eine
                        bleibende Erinnerung schaffen.
                    </p>
                </div>
            </div>
        </>
    );
}

export default AboutUs;
