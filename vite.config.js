import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { exec } from 'child_process'

function watchCsvPlugin() {
  return {
    name: 'watch-csv-plugin',
    configureServer(server) {
      server.watcher.add('./csv/*.csv');
      server.watcher.on('change', (file) => {
        if (file.endsWith('.csv')) {
          console.log(`\nCSV changed: ${file}. Re-running ingestion...`);
          exec('node scripts/ingest_data.js', (error, stdout, stderr) => {
            if (error) {
              console.error(`Ingestion error: ${error.message}`);
              return;
            }
            if (stderr) console.error(`Ingestion stderr: ${stderr}`);
            console.log(stdout);
          });
        }
      });
    },
    buildStart() {
      exec('node scripts/ingest_data.js', (error) => {
        if (error) console.error(`Ingestion error: ${error.message}`);
      });
    }
  }
}

export default defineConfig({
  base: '/fantasy-espn/',
  plugins: [
    watchCsvPlugin(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'Fantasy ESPN History Dashboard',
        short_name: 'Fantasy Hist',
        description: 'Dashboard interactivo de historia y estadísticas de la liga Fantasy ESPN.',
        theme_color: '#0f172a',
        background_color: '#0f172a',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
})
