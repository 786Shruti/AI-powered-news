import React from "react";

function Footer() {
  return (
    <footer className="bg-white shadow-inner py-6 mt-12">
      <div className="container mx-auto text-center text-gray-500">
        &copy; {new Date().getFullYear()} NewsApp. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
