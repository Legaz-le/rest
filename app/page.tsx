import CountriesFlag from "./components/countries-flag";
import Navbar from "./components/navbar";
import FilterControls from "./components/filter-controls";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ region?: string; search?: string }>;
}) {
  const { region = "", search = "" } = await searchParams;

  const res = await fetch(
    `http://localhost:3000/api/countries?region=${region}&search=${search}`,
    { next: { revalidate: 60 } } // or `cache: 'no-store'` if needed
  );
  const data = await res.json();
  const countries = data.countries;

  return (
    <div className="min-h-screen  transition-colors ">
      <Navbar />
      <div className="bg-Grey-50/50 min-h-screen dark:bg-Blue-950 px-5">
        <FilterControls />
        <div className="container mx-auto">
          <CountriesFlag countries={countries} />
        </div>
      </div>
    </div>
  );
}
