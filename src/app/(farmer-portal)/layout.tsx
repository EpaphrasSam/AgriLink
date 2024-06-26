import FarmerHeader from "@/components/layout/FarmerHeader";
import FarmerSideBar from "@/components/layout/FarmerSidebar";

export default function FarmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <FarmerHeader />
      <div
        className={`flex max-[450px]:flex-col-reverse w-full h-screen relative `}
      >
        <div className="max-[450px]:mb-4">
          <FarmerSideBar />
        </div>
        <div className="flex-1 flex-grow">{children}</div>
      </div>
    </>
  );
}
