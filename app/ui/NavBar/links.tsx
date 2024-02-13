// 'use server'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import { handleLogout } from '@/app/utils/auth';

export default  function Links(){
    // circle of profile img with caret (to indicate dropdown) to the right
    // when clicked, dropdown with 'logout' and 'settings' options
    const img ='https://via.placeholder.com/150';
    const dropdown = document.querySelector('.dropdown');
    
    
    const toggle = () => {
        if(dropdown){
            dropdown.classList.toggle('hidden');
        }
    }

    const  handleClick = async() => {
        try {
            console.log('logging out');
            await handleLogout()
        } catch (err) {
            console.log(err)
        }
    }
        
    return (
            // caret flush to bottom border of img
        <div>
            <button className="flex items-center" onClick={toggle}>
                <img src={img} alt="profile" className="h-12 w-12 rounded-full" />
                <FontAwesomeIcon icon={faCaretDown} className="ml-2 text-green" />
            </button>
            <div className="relative hidden dropdown">
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white" onClick={handleClick}>Logout</a>
                    <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Settings</a>
                </div>
            </div>
        </div>
    );

}