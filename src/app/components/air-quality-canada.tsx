'use client'

import { Combobox } from "@base-ui-components/react";
import { CheckIcon, Dices, Search } from "lucide-react";
import { useState } from "react";

interface City {
    code: string;
    value: string | null;
    continent: string;
    label: string;
}

const canadianCities: City[] = [
    // Alberta
    { code: "AB-CGY", value: "Calgary", continent: "North America", label: "Calgary, AB" },
    { code: "AB-EDM", value: "Edmonton", continent: "North America", label: "Edmonton, AB" },
    { code: "AB-RDR", value: "Red Deer", continent: "North America", label: "Red Deer, AB" },
    { code: "AB-LET", value: "Lethbridge", continent: "North America", label: "Lethbridge, AB" },
    { code: "AB-MED", value: "Medicine Hat", continent: "North America", label: "Medicine Hat, AB" },

    // British Columbia
    { code: "BC-VAN", value: "Vancouver", continent: "North America", label: "Vancouver, BC" },
    { code: "BC-VIC", value: "Victoria", continent: "North America", label: "Victoria, BC" },
    { code: "BC-KEL", value: "Kelowna", continent: "North America", label: "Kelowna, BC" },
    { code: "BC-KAM", value: "Kamloops", continent: "North America", label: "Kamloops, BC" },
    { code: "BC-PG", value: "Prince George", continent: "North America", label: "Prince George, BC" },
    { code: "BC-ABB", value: "Abbotsford", continent: "North America", label: "Abbotsford, BC" },
    { code: "BC-SUR", value: "Surrey", continent: "North America", label: "Surrey, BC" },
    { code: "BC-BUR", value: "Burnaby", continent: "North America", label: "Burnaby, BC" },

    // Manitoba
    { code: "MB-WPG", value: "Winnipeg", continent: "North America", label: "Winnipeg, MB" },
    { code: "MB-BRN", value: "Brandon", continent: "North America", label: "Brandon, MB" },
    { code: "MB-STB", value: "Steinbach", continent: "North America", label: "Steinbach, MB" },
    { code: "MB-THO", value: "Thompson", continent: "North America", label: "Thompson, MB" },

    // New Brunswick
    { code: "NB-MON", value: "Moncton", continent: "North America", label: "Moncton, NB" },
    { code: "NB-SJ", value: "Saint John", continent: "North America", label: "Saint John, NB" },
    { code: "NB-FRE", value: "Fredericton", continent: "North America", label: "Fredericton, NB" },

    // Newfoundland and Labrador
    { code: "NL-STJ", value: "St. John's", continent: "North America", label: "St. John's, NL" },
    { code: "NL-CB", value: "Corner Brook", continent: "North America", label: "Corner Brook, NL" },
    { code: "NL-GF", value: "Grand Falls-Windsor", continent: "North America", label: "Grand Falls-Windsor, NL" },

    // Nova Scotia
    { code: "NS-HFX", value: "Halifax", continent: "North America", label: "Halifax, NS" },
    { code: "NS-CB", value: "Cape Breton", continent: "North America", label: "Cape Breton, NS" },
    { code: "NS-TRU", value: "Truro", continent: "North America", label: "Truro, NS" },

    // Ontario
    { code: "ON-TOR", value: "Toronto", continent: "North America", label: "Toronto, ON" },
    { code: "ON-OTT", value: "Ottawa", continent: "North America", label: "Ottawa, ON" },
    { code: "ON-MSS", value: "Mississauga", continent: "North America", label: "Mississauga, ON" },
    { code: "ON-BRA", value: "Brampton", continent: "North America", label: "Brampton, ON" },
    { code: "ON-HAM", value: "Hamilton", continent: "North America", label: "Hamilton, ON" },
    { code: "ON-LON", value: "London", continent: "North America", label: "London, ON" },
    { code: "ON-MAR", value: "Markham", continent: "North America", label: "Markham, ON" },
    { code: "ON-VAU", value: "Vaughan", continent: "North America", label: "Vaughan, ON" },
    { code: "ON-KIT", value: "Kitchener", continent: "North America", label: "Kitchener, ON" },
    { code: "ON-WAT", value: "Waterloo", continent: "North America", label: "Waterloo, ON" },
    { code: "ON-WIN", value: "Windsor", continent: "North America", label: "Windsor, ON" },
    { code: "ON-KIN", value: "Kingston", continent: "North America", label: "Kingston, ON" },
    { code: "ON-BAR", value: "Barrie", continent: "North America", label: "Barrie, ON" },
    { code: "ON-SUD", value: "Sudbury", continent: "North America", label: "Sudbury, ON" },
    { code: "ON-THU", value: "Thunder Bay", continent: "North America", label: "Thunder Bay, ON" },

    // Prince Edward Island
    { code: "PE-CHA", value: "Charlottetown", continent: "North America", label: "Charlottetown, PE" },
    { code: "PE-SUM", value: "Summerside", continent: "North America", label: "Summerside, PE" },

    // Quebec
    { code: "QC-MTL", value: "Montreal", continent: "North America", label: "Montreal, QC" },
    { code: "QC-QUE", value: "Quebec City", continent: "North America", label: "Quebec City, QC" },
    { code: "QC-LAV", value: "Laval", continent: "North America", label: "Laval, QC" },
    { code: "QC-GAT", value: "Gatineau", continent: "North America", label: "Gatineau, QC" },
    { code: "QC-LON", value: "Longueuil", continent: "North America", label: "Longueuil, QC" },
    { code: "QC-SHE", value: "Sherbrooke", continent: "North America", label: "Sherbrooke, QC" },
    { code: "QC-SAG", value: "Saguenay", continent: "North America", label: "Saguenay, QC" },
    { code: "QC-TRO", value: "Trois-Rivières", continent: "North America", label: "Trois-Rivières, QC" },

    // Saskatchewan
    { code: "SK-REG", value: "Regina", continent: "North America", label: "Regina, SK" },
    { code: "SK-SAS", value: "Saskatoon", continent: "North America", label: "Saskatoon, SK" },
    { code: "SK-PA", value: "Prince Albert", continent: "North America", label: "Prince Albert, SK" },

    // Northwest Territories
    { code: "NT-YK", value: "Yellowknife", continent: "North America", label: "Yellowknife, NT" },

    // Nunavut
    { code: "NU-IQA", value: "Iqaluit", continent: "North America", label: "Iqaluit, NU" },

    // Yukon
    { code: "YT-WHI", value: "Whitehorse", continent: "North America", label: "Whitehorse, YT" }
];

const AirQualityRedesignCanada = () => {
    const [city, setCity] = useState<City | null>(null)

    return (
        <div className="flex justify-center px-4 items-center align-middle flex-col bg-white h-[100vh] w-[100vw]">
            <div className="bg-red-400 w-full h-48 rounded-xl flex flex-row justify-start items-center align-middle px-4 gap-6">
                <span className="text-[6rem]">11</span>
                <div className="flex flex-col justify-between py-8 gap-4 w-full">
                    <span>Very High Risk</span>
                    <form className="min-w-full mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 flex items-center ps-3.5">
                                <Search color="gray" size={15} className="pointer-events-none" />
                            </div>
                            <Combobox.Root items={canadianCities} value={city}>
                                <Combobox.Trigger className="box-border flex items-center justify-between gap-3 h-10 pl-3.5 pr-3 m-0 outline-none border bg-gray-100 border-gray-300 text-gray-900 text-xs font-sm ps-10 rounded-lg font-inherit leading-6 cursor-default select-none w-full
                                            hover:bg-gray-100 focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:-outline-offset-1">
                                    <Combobox.Value />
                                    <Combobox.Icon className="flex" onClick={() => { setCity(canadianCities[Math.floor(Math.random() * canadianCities.length)]) }}>
                                        <div className="absolute inset-y-0 flex items-center right-3.5">
                                            <div className="rounded-full right-3.5 bg-[radial-gradient(circle,_rgb(219_234_254)_0%,_rgb(219_234_254_/_0.6)_50%,_transparent_80%)]"><Dices color="blue" className="bg-blue-100 m-2" size={15} /></div>
                                        </div>
                                    </Combobox.Icon>
                                </Combobox.Trigger>
                                <Combobox.Portal>
                                    <Combobox.Positioner align="start" sideOffset={4}>
                                        <Combobox.Popup className="box-border rounded-md bg-white text-gray-900 max-h-96 outline-1 outline-gray-200
                                                    shadow-lg shadow-gray-200/50 origin-top animate-in fade-in zoom-in-95 duration-150 w-full mr-[-16]" aria-label="Search destination">
                                            <div className="box-border w-full h-12 text-center p-2">
                                                <Combobox.Input placeholder="e.g. Montreal, QC" className="box-border pl-3.5 m-0 border border-gray-300 w-full h-10 rounded-md
                                                        font-inherit text-base bg-white text-gray-900 outline-none focus:border-blue-500 focus:outline-1 focus:outline-blue-500" />
                                            </div>
                                            <Combobox.Empty className="min-w-[var(--anchor-width)] box-border text-[0.925rem] leading-4 text-gray-600 p-4 empty:hidden">No countries found.</Combobox.Empty>
                                            <Combobox.List className="box-border overflow-auto max-h-64 [scroll-padding-block:0.5rem] py-2 overscroll-contain empty:p-0">
                                                {(city: City) => (
                                                    <Combobox.Item onClick={() => setCity(city)} key={city.code} value={city} className="box-border outline-0 cursor-default select-none min-w-[var(--anchor-width)] py-2 pl-4 pr-8 grid gap-2 items-center grid-cols-[0.75rem_1fr] text-base leading-4 data-[highlighted]:z-0 data-[highlighted]:relative data-[highlighted]:text-gray-50 data-[highlighted]:before:content-[''] data-[highlighted]:before:z-[-1] data-[highlighted]:before:absolute data-[highlighted]:before:inset-y-0 data-[highlighted]:before:inset-x-2 data-[highlighted]:before:rounded data-[highlighted]:before:bg-gray-900">
                                                        <Combobox.ItemIndicator className="col-start-1">
                                                            <CheckIcon className="block w-3 h-3" />
                                                        </Combobox.ItemIndicator>
                                                        <div className="col-start-2">{city.label ?? city.value}</div>
                                                    </Combobox.Item>
                                                )}
                                            </Combobox.List>
                                        </Combobox.Popup>
                                    </Combobox.Positioner>
                                </Combobox.Portal>
                            </Combobox.Root>
                        </div>
                    </form>
                </div>
            </div>
            <div className="flex flex-row h-8 mt-6 w-full">
                <div className="bg-[#08D2FF] w-1/11"></div>
                <div className="bg-[#009BD1] w-1/11"></div>
                <div className="bg-[#01689C] w-1/11"></div>
                <div className="bg-[#FFFF04] w-1/11"></div>
                <div className="bg-[#FFC900] w-1/11"></div>
                <div className="bg-[#FF9400] w-1/11"></div>
                <div className="bg-[#FF5760] w-1/11"></div>
                <div className="bg-[#FF0000] w-1/11"></div>
                <div className="bg-[#DF0000] w-1/11"></div>
                <div className="bg-[#A80000] w-1/11"></div>
                <div className="bg-[#7E0403] w-1/11"></div>
            </div>
        </div>
    )

}

export default AirQualityRedesignCanada;