import Checkout from "@/components/pages/checkout/Checkout";
import { Spinner } from "@nextui-org/react";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Spinner size="lg" />
        </div>
      }
    >
      <Checkout />
    </Suspense>
  );
}
