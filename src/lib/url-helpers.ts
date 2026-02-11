export const generateGoogleSearchUrl = (searchTerm: string) => {
    const formattedSearchTerm = searchTerm.replace(/\s+/g, "+");
    const googleSearchUrl = `https://www.google.com/search?q=${formattedSearchTerm}&hl=id`;

    return googleSearchUrl;
};
