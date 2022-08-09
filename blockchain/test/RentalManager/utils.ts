import catalogues from "./catalogues.json";

export function getTestCatalogue(i: number) {
    const catalogue = catalogues[i];
    return {
        names: catalogue.map((b) => b.name),
        authors: catalogue.map((b) => b.author),
        ISBNs: catalogue.map((b) => b.ISBN),
        quantities: catalogue.map((b) => b.quantity),
    };
}
