import Button from "@/Components/Button";
import CSRFToken from "@/Components/Form/CSRFToken";
import FileInput from "@/Components/Form/FileInput";
import Input from "@/Components/Form/Input";
import SelectInput from "@/Components/Form/SelectInput";
import Textarea from "@/Components/Form/Textarea";
import Pagination from "@/Components/Pagination/Pagination";
import Recommend from "@/Components/Rating/Recommend";
import Review from "@/Components/Rating/Review";
import StarRating from "@/Components/Rating/StarRating";
import { Head } from "@inertiajs/inertia-react";
import React from "react";

function Ratings({ ratings }) {
    return (
        <>
            <Head title="OnTime | Bewertungen" />
            <div className="max-w-4xl mx-auto w-full h-full relative px-8 sm:px-10 pt-14 space-y-10">
                <div>
                    <h3 className="text-2xl font-bold text-center sm:text-left">
                        Bewerten Sie uns!
                    </h3>
                    <form action="/ratings/create" method="post">
                        <div className="sm:rounded-md">
                            <div className="py-5 bg-white sm:py-8">
                                <div className="grid grid-cols-6 gap-6">
                                    <Input
                                        containerClass="col-span-6 sm:row-start-1 sm:col-span-3"
                                        type="text"
                                        name="name"
                                        placeholder="Vor- und Nachname"
                                        // value={data.password}
                                        autoComplete="given-name"
                                        title="Name"
                                        required={true}
                                    />

                                    <Input
                                        containerClass="col-span-6 sm:row-start-2 sm:col-span-3"
                                        type="text"
                                        name="title"
                                        placeholder="Titel der Bewertung"
                                        // value={data.password}
                                        autoComplete="new-password"
                                        title="Titel"
                                        required={true}
                                    />

                                    <SelectInput
                                        title="Unternehmen / Bildungseinrichtung"
                                        name="facilityName"
                                        // value,
                                        selectName="facility"
                                        selectTitle="Einrichtung"
                                        placeholder="Name der Einrichtung"
                                        containerClass="col-span-6 sm:col-span-3 sm:row-start-3"
                                    >
                                        <option>Unternehmen</option>
                                        <option>Universität</option>
                                        <option>Schule</option>
                                    </SelectInput>

                                    <Textarea
                                        title="Rezession"
                                        name="recession"
                                        rows={5}
                                        containerClass="col-span-6 sm:row-start-4"
                                        placeholder="Ihre Bewertung..."
                                        required={true}
                                    />

                                    <FileInput
                                        containerClass="col-span-6 sm:col-span-3 row-span-3 sm:row-start-1"
                                        title="Artikelfoto hochladen"
                                        text="Datei hochladen"
                                        hint="PNG, JPG, bis zu 5MB"
                                        name="photo"
                                        accept="image/x-png,image/jpeg"
                                        multiple={false}
                                    />

                                    <div className="col-span-6 sm:col-span-2 sm:col-start-1 md:col-start-2 text-center sm:text-left">
                                        <p className="font-semibold text-lg">
                                            Bewertung
                                        </p>
                                        <StarRating />
                                    </div>

                                    <div className="col-span-6 sm:col-span-2 sm:col-start-5 text-center sm:text-left">
                                        <p className="font-semibold text-lg">
                                            Würden Sie uns
                                            <br /> weiterempfehlen?
                                        </p>
                                        <Recommend />
                                    </div>

                                    <CSRFToken />

                                    <div className="col-span-6 sm:col-start-3 sm:col-span-2 px-4 py-3 text-center sm:px-6">
                                        <Button>Abschicken</Button>
                                    </div>
                                    <div className="col-span-6 sm:col-start-5 sm:col-span-2 flex items-center justify-center sm:justify-end">
                                        <span className="font-bold text-lg">
                                            Vielen Dank!
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className=" space-y-4">
                    <h3 className="text-2xl font-bold text-center sm:text-left">
                        Unsere Bewertungen
                    </h3>
                    <div className="w-full">
                        <Pagination pagination={ratings.pagination}>
                            <div className="flex flex-col divide-y">
                                {ratings.pagination.data.map((review, idx) => (
                                    <Review key={idx} review={review} />
                                ))}
                            </div>
                        </Pagination>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Ratings;
