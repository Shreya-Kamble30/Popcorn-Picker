   import React from 'react';
   import { FaHome, FaHeart,FaComments } from 'react-icons/fa'; // Import icons from react-icons
   import { Link } from 'react-router-dom';

   const Navbar = () => {
     return (
       <nav className="flex fixed w-full top-0 justify-between items-center p-4 bg-[#190019] text-white">
         <h1 className="text-xl font-bold">Popcorn Picker</h1>
         <div className="flex  space-x-4">
            <Link to="/"><FaHome className="cursor-pointer" /></Link>
            <Link to="./Favorite"><FaHeart className="cursor-pointer" /></Link>
         </div>
       </nav>
     );
   };

   export default Navbar;
   