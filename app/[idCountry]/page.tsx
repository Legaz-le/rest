

import { notFound } from "next/navigation";
import CountryClientComponent from "../components/countryInfo";
import { Country } from "../lib/type";


export async function generateStaticParams() {
  const baseUrl = process.env.BASE_URL || "https://restcountries.com";

  const res = await fetch(`${baseUrl}/api/countries`);

  if (!res.ok) {
    console.error("Failed to fetch countries:", await res.text());
    return []; // Return empty array to avoid breaking build
  }

  const { countries } = await res.json();

  return countries.map((c: { cca3: string }) => ({
    idCountry: c.cca3.toLowerCase(),
  }));
}

type CountryPageProps = {
  params: Promise<{ idCountry: string }>;
};

export default async function CountryPage({ params }: CountryPageProps) {
  
  const { idCountry } = await params;
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/countries`, {
    next: { revalidate: 86400 },
  });
  const { countries, cca3NameMap } = await res.json();

  const countriesWithFormatted = countries.map((country: Country) => ({
    ...country,
    formattedPopulation: country.population.toLocaleString('en-US'),
  }));
  const country = countriesWithFormatted.find((c: { cca3: string }) => c.cca3 === idCountry.toUpperCase());

  if (!country) return notFound();
  return (
    <>
      <CountryClientComponent country={country} cca3NameMap={cca3NameMap }/>
    </>
  );
}
