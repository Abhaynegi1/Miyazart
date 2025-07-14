import React from "react";

const Footer = () => (
  <footer
    className="px-4 py-12 sm:px-6 lg:px-8"
    style={{ backgroundColor: "#FAF4E8" }}
  >
    <div
      className="mt-8 border-t pt-8 text-center"
      style={{ borderColor: "#C8C1B2" }}
    >
      <p style={{ color: "#6B6B6B" }}>
        &copy; {new Date().getFullYear()} MiyazArt. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
