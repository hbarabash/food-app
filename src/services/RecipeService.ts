
export const getRandomRecipe = async () => {

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    const baseUrl = 'https://api.spoonacular.com/recipes/random?apiKey=7d630837b6d0442e9dd50eb059343d02&number=1'
    const request = await fetch(baseUrl, {
        method: 'GET',
        headers: requestHeaders
    });
    const response = request.json();
    console.log(response);
    return response;
}

export const getRecipeSearchResults = async (input: string) => {

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    const baseUrl = 'https://api.spoonacular.com/recipes/complexSearch?query=' + input + '&apiKey=7d630837b6d0442e9dd50eb059343d02'
    const request = await fetch(baseUrl, {
        method: 'GET',
        headers: requestHeaders
    });
    const response = request.json();
    console.log("RESPONSE: " + response);
    return response;
}