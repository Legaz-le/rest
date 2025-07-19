"use client";

import Image from "next/image";
import Link from "next/link";
import { Country } from "../lib/type";

type Props = {
  countries: Country[];
};


export default function CountriesFlag({ countries }: Props) {
  
  return (
    <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-20">
      {countries.map((country: Country) => (
        <Link key={country.cca3} href={`/${country.cca3}`}>
          <div
            key={country.cca3}
            className="bg-white  rounded-lg shadow-md dark:bg-Blue-900 dark:text-White hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              width={300}
              height={200}
              src={country.flags.svg}
              alt={`${country.name.common} Flag`}
              className="w-full h-50 object-cover rounded-t-lg shadow-md"
            />
            <div className="p-6 pb-15 space-y-1 ">
              <h3 className="text-lg text  mt-2 mb-5 font-[800]">
                {country.name.common}
              </h3>
              <p className="font-[600]">
                Population:{" "}
                <span className="font-[300] text-Grey-400">
                  {country.population.toLocaleString("en-US")}
                </span>
              </p>
              <p className="font-[600]">
                Region:{" "}
                <span className="font-[300] text-Grey-400">
                  {country.region}
                </span>
              </p>
              <p className="font-[600]">
                Capital:{" "}
                <span className="font-[300] text-Grey-400">
                  {" "}
                  {country.capital ? country.capital[0] : "N/A"}
                </span>
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
