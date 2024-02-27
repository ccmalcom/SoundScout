## Backlog
-- geolocation (latlong)
-- refresh token auto get
-- ui design (likely restructure components)
-- top artists
    --all time, this month, this year, etc.
-- top tracks
-- events
    -- radius picker
    -- location change (zipcode first, then maps api (autocomplete address, convert to latlong))


Figma link: https://www.figma.com/file/X4FxHGKpwIiqVmJvEQObGL/Spotify-Concert-Finder?type=design&node-id=0%3A1&mode=design&t=Uum8vbR43eq6Qenf-1

Data flow model:

Login page => redirect to spotify auth handler (...wait) 
callback page sets token and redirects to dashboard
userProfile fetched by NavBar, topArtists and topTracks by dashboard, topEvents by event page

v2:
Login page => redirect to spotify auth handler (...wait) 
callback fetches profile, artists, tracks, and event data before redirect
pass results to dashboard