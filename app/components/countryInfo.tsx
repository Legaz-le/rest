"use client";

import Navbar from "./navbar";
import Link from "next/link";
import Image from "next/image";
import { Country } from "../lib/type";

export default function CountryClientComponent({
  country, cca3NameMap
}: {
  country: Country, cca3NameMap: Record<string, string>;
}) {
  return (
    <>
      <Navbar />
      <div className="bg-Grey-50/50 min-h-screen dark:bg-Blue-950  ">
        <div className="container mx-auto py-8 ">
          <Link href="/">
            <button className="ml-5 cursor-pointer flex items-center gap-2 text-md px-5 py-3 font-[600] dark:bg-Blue-900 shadow-lg dark:text-White rounded-md hover:bg-Blue-800 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 25 25"
                width={24}
                height={24}
              >
                <path
                  className="fill-black dark:fill-white"
                  d="M24 12.001H2.914l5.294-5.295-.707-.707L1 12.501l6.5 6.5.707-.707-5.293-5.293H24v-1z"
                  data-name="Left"
                />
              </svg>
              Back
            </button>
          </Link>
          <div className="flex flex-col items-center lg:flex-row gap-8 mt-10 w-full ">
            <Image
              height={400}
              width={600}
              src={country.flags.svg}
              alt="flag"
              className="mb-4 w-full lg:max-w-[500px] xl:max-w-[700px] px-5 h-auto object-contain flex-1"
            />
            <div className="flex px-5 flex-col  space-y-9 dark:text-White w-full flex-1">
              <div className="flex  flex-wrap  mt-4 ">
                <div className="flex  lg:items-center flex-col lg:flex-row justify-between w-full">
                  <div className="space-y-2    ">
                    <h1 className="text-2xl font-bold mb-8">
                      {country.name.common}
                    </h1>
                    <p className="font-[600]">
                      Native Name:{" "}
                      <span className="font-[300] text-Grey-400">
                        {country.name.common}
                      </span>
                    </p>
                    <p className="font-[600]">
                      Population:{" "}
                      <span className="font-[300] text-Grey-400">
                        {" "}
                        {country.formattedPopulation}
                      </span>
                    </p>
                    <p className="font-[600]">
                      Region:{" "}
                      <span className="font-[300] text-Grey-400">
                        {" "}
                        {country.region}
                      </span>
                    </p>
                    <p className="font-[600]">
                      Sub Region:{" "}
                      <span className="font-[300] text-Grey-400">
                        {country.subregion ?? "N/A"}
                      </span>
                    </p>
                    <p className="font-[600]">
                      Capital:{" "}
                      <span className="font-[300] text-Grey-400">
                        {country.capital?.[0] || "N/A"}
                      </span>
                    </p>
                  </div>
                  <div className="space-y-2 ">
                    <p className="font-[600]">
                      Top Level Domain:{" "}
                      <span className="font-[300] text-Grey-400">
                        {" "}
                        {country.tld?.[0] || "N/A"}
                      </span>
                    </p>
                    <p className="font-[600]">
                      Currencies:{" "}
                      <span className="font-[300] text-Grey-400">
                        {country.currencies
                          ? Object.values(country.currencies )
                              .map((c) => `${c.name} (${c.symbol})`)
                              .join(", ")
                          : "N/A"}
                      </span>
                    </p>
                    <p className="font-[600]">
                      Languages:{" "}
                      <span className="font-[300] text-Grey-400">
                        {country.languages
                          ? Object.values(country.languages).join(", ")
                          : "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-15  flex flex-col lg:flex-row  gap-6 w-full">
                <h2 className="text-lg font-[600] whitespace-nowrap">
                  Border Countries:
                </h2>
                <div className="flex flex-wrap gap-4 w-full ">
                  {country.borders?.length ? (
                    country.borders.map((border: string) => (
                      <Link
                        key={border}
                        href={`/${border}`}
                        className="bg-White dark:bg-Blue-900 dark:text-White px-4 py-2 rounded-md shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        {cca3NameMap[border] || border}
                      </Link>
                    ))
                  ) : (
                    <p className="text-Grey-400">No Border Countries</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
