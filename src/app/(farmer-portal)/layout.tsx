import FarmerHeader from "@/components/layout/FarmerHeader";
import FarmerSideBar from "@/components/layout/FarmerSidebar";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <FarmerHeader />
      <div
        className={`flex max-md:flex-col-reverse w-full min-h-screen relative `}
      >
        <div className="max-md:sticky max-md:bottom-0 max-md:mb-0 md:sticky md:top-0 md:self-start md:h-screen z-10 bg-white backdrop-filter backdrop-blur-lg">
          <FarmerSideBar />
        </div>
        <div className="flex-1 flex-grow">{children}</div>
      </div>
    </div>
  );
}
