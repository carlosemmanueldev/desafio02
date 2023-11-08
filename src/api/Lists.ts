const access_token = import.meta.env.VITE_API_ACCESS_TOKEN;

export async function getPopular(type: string, page: number = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/popular?language=pt-BR&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return  resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getTopRated(type: string) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/top_rated?language=pt-BR&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getCollection(id:number) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/collection/${id}?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        return  await response.json();
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getNowPlaying() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getUpcoming() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/upcoming?language=pt-BR&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getAiringToday() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/airing_today?language=pt-BR&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getOnAir() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/on_the_air?language=pt-BR&page=1`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function getSeasonDetails(seriesId: number, seasonNumber: number) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/tv/${seriesId}/season/${seasonNumber}?language=pt-BR`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer ' + access_token
            },
        });

        const resData = await response.json();
        return resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}