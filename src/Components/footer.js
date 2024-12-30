import { IconButton } from '@mui/material';
import { Instagram, YouTube, GitHub, Email, Facebook } from '@mui/icons-material';
import React, { useEffect} from 'react';
 
function Footer() {

  useEffect(() => {
          const storedTheme = localStorage.getItem('theme') || 'light';
          const cssFile = storedTheme === "light" ? "/Css/footer2.css" : "/Css/footer.css"; // Correction du chemin
  
          // Vérifiez si un lien avec ce href existe déjà
          const existingLink = document.querySelector(`link[href="${cssFile}"]`);
          if (!existingLink) {
              // Dynamically add the CSS file to the document
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = cssFile;
              document.head.appendChild(link);
  
              // Cleanup function to remove the CSS file if the component unmounts
              return () => {
                  document.head.removeChild(link);
              };
          }
      }, []);

  return (
    <footer className="footer">
      <p>&copy; 2024 . All rights reserved.</p>
      <div className="social-icons">
        <IconButton component="a"  target="_blank" aria-label="Instagram">
          <Instagram />
        </IconButton>

        <IconButton component="a" href="https://www.youtube.com" target="_blank" aria-label="YouTube">
          <YouTube />
        </IconButton>

        <IconButton component="a" href="https://github.com" target="_blank" aria-label="GitHub">
          <GitHub />
        </IconButton>

        <IconButton component="a" href="mailto:someone@example.com" aria-label="Email">
          <Email />
        </IconButton>

        <IconButton component="a"  target="_blank" aria-label="Facebook">
          <Facebook />
        </IconButton>
      </div>
    </footer>
  );
}

export default Footer;
