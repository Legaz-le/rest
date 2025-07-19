import PageClient from "./PageClient";

export default function Navbar() {
  return (
    <div className="shadow-md   dark:bg-Blue-900 px-5">
      <div className="container mx-auto flex items-center justify-between  py-8 ">
        <h1 className="font-[800] text-[20px] dark:text-White">
          Where is the world?
        </h1>
        <PageClient />
      </div>
    </div>
  );
}
