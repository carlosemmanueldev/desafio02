export async function getPopular(type: string, page: number = 1) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/${type}/popular?language=pt-BR&page=${page}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
            },
        });

        const resData = await response.json();
        return  resData;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}