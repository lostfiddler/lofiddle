vite build
sudo rm -r /var/www/animations
sudo cp -r dist /var/www/animations
sudo chown www-data /var/www/animations
