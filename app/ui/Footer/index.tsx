
export default function Footer() {
    return (
        <footer className="footer m-5 text-gray-500">
            <div className="footer-content text-center">
                <p>Created by <a href="https://github.com/ccmalcom/" target="_blank" rel="noopener noreferrer" className="hover:text-white">ccmalcom</a> &copy; 2024</p>
                <p>Powered by <a href="https://developer.spotify.com/" target="_blank" rel="noopener noreferrer" className="hover:text-green">Spotify API</a> and <a href="https://developer.ticketmaster.com/" target="_blank" rel="noopener noreferrer" className="hover:text-blue">Ticketmaster API</a></p>
            </div>
        </footer>
    );
}