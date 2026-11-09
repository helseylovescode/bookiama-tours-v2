import { permanentRedirect } from "next/navigation";

export default function CollectionsRedirect() {
  permanentRedirect("/#collections");
}
