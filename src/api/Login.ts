export async function requestToken() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/token/new', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
            },
        });

        const resData = await response.json();
        const {request_token} = resData;
        window.location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=http://localhost:5173/approved`;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function createGuestSession() {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/guest_session/new', {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
            }
        });

        const resData = await response.json();
        const {guest_session_id} = resData;
        return guest_session_id;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}

export async function createSession(request_token: string) {
    try {
        const response = await fetch('https://api.themoviedb.org/3/authentication/session/new', {
            method: 'POST',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxOGQyZTQ3NTkwMTMyOTE1NjZmYzc4ZDhiN2MxNjg2YSIsInN1YiI6IjY1NDJmM2E2ZWQyYWMyMDExZTRiZGZjYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.0iESygWdEhVErVrKxGLP7nbBkIn8Y52CAsqFVYb9lVs'
            },
            body: JSON.stringify({request_token: request_token})
        });

        const resData = await response.json();
        const {session_id} = resData;
        return session_id;
    } catch (e: any) {
        throw new Error(e.statusText);
    }
}