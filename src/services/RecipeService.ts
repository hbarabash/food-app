
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

export const getRecipeById = async (id: number) => {

    const requestHeaders: HeadersInit = new Headers();
    requestHeaders.set('Content-Type', 'application/json');

    const baseUrl = 'https://api.spoonacular.com/recipes/' + id + '/information?apiKey=7d630837b6d0442e9dd50eb059343d02'
    const request = await fetch(baseUrl, {
        method: 'GET',
        headers: requestHeaders
    });
    const response = request.json();
    console.log(response);
    return response;
}

// gmail key apiKey=7d630837b6d0442e9dd50eb059343d02
// icloud key apiKey=5e05934218654335a5b09ae804a8e0fb