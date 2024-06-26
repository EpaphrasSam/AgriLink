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
        className={`flex max-[768px]:flex-col-reverse w-full min-h-screen relative `}
      >
        <div className="max-[768px]:mb-4">
          <FarmerSideBar />
        </div>
        <div className="flex-1 flex-grow">{children}</div>
      </div>
    </div>
  );
}
