export async function fetchPlace(search) {
    try {
        const placesRes = await fetch(`/api/places/autocomplete?search=${search}`)
        const data = await placesRes.json()
        return data;
    } catch (err) {
        console.log(err)
    }
}

export async function fetchGeoLocation(id) {
    try {
        const placesRes = await fetch(`/api/places/geolocation?id=${id}`)
        const data = await placesRes.json()
        return data;
    } catch (err) {
        console.log(err)
    }
}