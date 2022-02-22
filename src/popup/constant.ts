import { Background } from "@/definitions/background";

export const BG: Background =
  ENV === "development" ? window.bg : chrome.extension.getBackgroundPage();