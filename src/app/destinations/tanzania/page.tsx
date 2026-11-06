import type { Metadata } from "next";
import DestinationPage from "../DestinationPage";
import { DESTINATIONS } from "../data";

export const metadata: Metadata = {
  title: "Tanzania",
  description:
    "Explore Tanzania — the Serengeti, Ngorongoro Crater, Kilimanjaro and the beaches of Zanzibar. Book your Tanzania journey with Bokiama Tours & Travel.",
};

export default function TanzaniaPage() {
  return <DestinationPage destination={DESTINATIONS.tanzania} />;
}
