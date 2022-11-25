export default function getHome({ options: { routes } }: any) {
  for (const i of routes) {
    if (i.name === "home") {
      return i;
    }
  }
}
