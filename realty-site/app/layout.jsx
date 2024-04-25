import "@/assets/styles/globals.css";
import { title } from "process";

export const metadata = {
  title: "RealtorReady | Find your next Rental Property",
  description:
    "RealtorReady is a platform that helps you find your next rental property. We provide a platform to find the best rental property in your area.",
  keywords: "rental, find rentals, find properties",
};

const MainLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default MainLayout;
