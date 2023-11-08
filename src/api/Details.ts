const access_token = import.meta.env.VITE_API_ACCESS_TOKEN;

export async function getDetails(type: string, id: number) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        return await response.json();
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getSimilar(type: string, id: number, page: number = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/${id}/similar?language=pt-BR&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData.results;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}