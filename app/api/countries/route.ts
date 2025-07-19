import { NextResponse } from "next/server";
import { Country, CountryBase, CountryExtra } from "@/app/lib/type";
let cache: {
  countries: Country[];
  cca3NameMap: Record<string, string>;
} | null = null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const region = searchParams.get("region")?.toLowerCase() || "";
  const search = searchParams.get("search")?.toLowerCase() || "";

 if (!cache) {
    try {
      const res1 = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,name,flags,population,region,subregion,capital,tld",
        { next: { revalidate: 86400 } }
      );
      if (!res1.ok) throw new Error(`Failed to fetch data1: ${res1.status}`);

      const res2 = await fetch(
        "https://restcountries.com/v3.1/all?fields=cca3,currencies,languages,borders",
        { next: { revalidate: 86400 } }
      );
      if (!res2.ok) throw new Error(`Failed to fetch data2: ${res2.status}`);

      const data1: CountryBase[] = await res1.json();
      const data2: CountryExtra[] = await res2.json();

      const extraDataMap = new Map<string, CountryExtra>();
      data2.forEach((c) => {
        if (c.cca3) {
          extraDataMap.set(c.cca3, {
            cca3: c.cca3,
            currencies: c.currencies,
            languages: c.languages,
            borders: c.borders,
          });
        }
      });

      const merged = data1.map((country) => ({
        ...country,
        ...extraDataMap.get(country.cca3),
      }));

      const cca3NameMap: Record<string, string> = {};
      merged.forEach((c) => {
        cca3NameMap[c.cca3] = c.name.common;
      });

      cache = { countries: merged, cca3NameMap };
    } catch (error) {
      console.error("Error fetching countries data:", error);
      return NextResponse.json(
        { error: "Failed to fetch countries data" },
        { status: 500 }
      );
    }
  }

  // Filter using query params
  const filtered = cache.countries.filter((country) => {
    const matchRegion = region ? country.region.toLowerCase() === region : true;
    const matchSearch = search
      ? country.name.common.toLowerCase().includes(search)
      : true;
    return matchRegion && matchSearch;
  });

  return NextResponse.json({
    countries: filtered,
    cca3NameMap: cache.cca3NameMap,
  });
}
