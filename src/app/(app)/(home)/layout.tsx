import { Footer } from "@/components/home/footer";
import { Navbar } from "@/components/home/Navbar";
import { SearchFilters } from "@/components/search-filter";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import { Category } from "@/payload-types";
const HomeLayout = async ({ children }: { children: React.ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1, // populate subcategories
    pagination: false,
    where: {
      parent: {
        exists: false,
      },
    },
  });
  const formattedData = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));
  console.log(data);
  console.log("formattedData", formattedData);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
