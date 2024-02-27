

export default async function eventSearch(params: { keyword: string, latlong: string, startDateTime: string, radius: string, unit: string }) {
    // console.log('###SERVER--getting events...');
    let token = process.env.TM_CLIENT_KEY;
    let { keyword, latlong, startDateTime, radius, unit } = params;
    if (token) {
        const url = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${keyword}&latlong=${latlong}&startDateTime=${startDateTime}&radius=${radius}&unit=${unit}&apikey=${token}`;
        try {
            let request = await fetch(url, { method: 'GET' });
            const result = await request.json();
            return result;
        } catch (error) {
            console.warn(`Error getting events: ${error}`);
            return new Response(`Error getting events: ${error}`, {
                status: 500
            });
        }

    } else {
        return new Response('no token provided', {
            status: 400
        })
    }
}