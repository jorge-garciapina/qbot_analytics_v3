import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();

const apiURL = process.env.VITE_API_URL;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/calls": {
        target: apiURL,
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
