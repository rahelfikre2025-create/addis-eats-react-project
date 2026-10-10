import dishes from "../public/menu-data.json";

export default async function sitemap() {
  const baseUrl = "https://addiseats.et";

  const dishUrls = dishes.map((dish) => ({
    url: `${baseUrl}/menu/${dish.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/menu`,
      lastModified: new Date(),
    },
    ...dishUrls,
  ];
}