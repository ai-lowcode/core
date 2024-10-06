// vite.config.ts
import * as path from "node:path";
import process from "node:process";
import vue from "file:///Users/k.n/Desktop/project/Ai-LowCode/admin/node_modules/.pnpm/@vitejs+plugin-vue@5.1.3_vite@5.4.3_@types+node@22.5.4_sass@1.78.0_terser@5.32.0__vue@3.5.3_typescript@5.5.4_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import autoprefixer from "file:///Users/k.n/Desktop/project/Ai-LowCode/admin/node_modules/.pnpm/autoprefixer@10.4.20_postcss@8.4.45/node_modules/autoprefixer/lib/autoprefixer.js";
import tailwindcss from "file:///Users/k.n/Desktop/project/Ai-LowCode/admin/node_modules/.pnpm/tailwindcss@3.4.10_ts-node@10.9.2_@types+node@22.5.4_typescript@5.5.4_/node_modules/tailwindcss/lib/index.js";
import { defineConfig, loadEnv } from "file:///Users/k.n/Desktop/project/Ai-LowCode/admin/node_modules/.pnpm/vite@5.4.3_@types+node@22.5.4_sass@1.78.0_terser@5.32.0/node_modules/vite/dist/node/index.js";
import { createHtmlPlugin } from "file:///Users/k.n/Desktop/project/Ai-LowCode/admin/node_modules/.pnpm/vite-plugin-html@3.2.2_vite@5.4.3_@types+node@22.5.4_sass@1.78.0_terser@5.32.0_/node_modules/vite-plugin-html/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/k.n/Desktop/project/Ai-LowCode/admin/app/admin";
var vite_config_default = defineConfig(({ command, mode }) => {
  const root = process.cwd();
  const env = loadEnv(mode, `${root}/environment`);
  return {
    base: "./",
    envPrefix: "APP_",
    // APP_  为自定义开头名
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, "src")
      }
    },
    css: {
      postcss: {
        plugins: [
          tailwindcss,
          autoprefixer
        ]
      }
    },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:8888",
          changeOrigin: true,
          rewrite: (path2) => path2.replace(/^\/api/, "")
        }
      }
    },
    build: {
      target: "es2015",
      sourcemap: false,
      // 消除打包大小超过500kb警告
      chunkSizeWarningLimit: 4e3,
      rollupOptions: {
        // 静态资源分类打包
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]"
        }
      }
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        minify: true,
        /**
         * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
         * @default src/main.ts
         */
        entry: "src/main.ts",
        /**
         * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
         * @default index.html
         */
        template: "index.html",
        /**
         * Data that needs to be injected into the index.html ejs template
         */
        inject: {
          data: env
        }
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvay5uL0Rlc2t0b3AvcHJvamVjdC9BaS1Mb3dDb2RlL2FkbWluL2FwcC9hZG1pblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2subi9EZXNrdG9wL3Byb2plY3QvQWktTG93Q29kZS9hZG1pbi9hcHAvYWRtaW4vdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2subi9EZXNrdG9wL3Byb2plY3QvQWktTG93Q29kZS9hZG1pbi9hcHAvYWRtaW4vdml0ZS5jb25maWcudHNcIjtpbXBvcnQgKiBhcyBwYXRoIGZyb20gJ25vZGU6cGF0aCdcblxuaW1wb3J0IHByb2Nlc3MgZnJvbSAnbm9kZTpwcm9jZXNzJ1xuXG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSdcbmltcG9ydCBhdXRvcHJlZml4ZXIgZnJvbSAnYXV0b3ByZWZpeGVyJ1xuaW1wb3J0IHRhaWx3aW5kY3NzIGZyb20gJ3RhaWx3aW5kY3NzJ1xuaW1wb3J0IHsgQ29uZmlnRW52LCBVc2VyQ29uZmlnLCBkZWZpbmVDb25maWcsIGxvYWRFbnYgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3JlYXRlSHRtbFBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWh0bWwnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBjb21tYW5kLCBtb2RlIH06IENvbmZpZ0Vudik6IFVzZXJDb25maWcgPT4ge1xuICBjb25zdCByb290ID0gcHJvY2Vzcy5jd2QoKVxuICBjb25zdCBlbnYgPSBsb2FkRW52KG1vZGUsIGAke3Jvb3R9L2Vudmlyb25tZW50YCkgYXMgYW55XG4gIHJldHVybiB7XG4gICAgYmFzZTogJy4vJyxcbiAgICBlbnZQcmVmaXg6ICdBUFBfJywgLy8gQVBQXyAgXHU0RTNBXHU4MUVBXHU1QjlBXHU0RTQ5XHU1RjAwXHU1OTM0XHU1NDBEXG4gICAgcmVzb2x2ZToge1xuICAgICAgYWxpYXM6IHtcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gICAgY3NzOiB7XG4gICAgICBwb3N0Y3NzOiB7XG4gICAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgICB0YWlsd2luZGNzcyxcbiAgICAgICAgICBhdXRvcHJlZml4ZXIsXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgc2VydmVyOiB7XG4gICAgICBwcm94eToge1xuICAgICAgICAnL2FwaSc6IHtcbiAgICAgICAgICB0YXJnZXQ6ICdodHRwOi8vbG9jYWxob3N0Ojg4ODgnLFxuICAgICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcbiAgICAgICAgICByZXdyaXRlOiBwYXRoID0+IHBhdGgucmVwbGFjZSgvXlxcL2FwaS8sICcnKSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBidWlsZDoge1xuICAgICAgdGFyZ2V0OiAnZXMyMDE1JyxcbiAgICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgICAvLyBcdTZEODhcdTk2NjRcdTYyNTNcdTUzMDVcdTU5MjdcdTVDMEZcdThEODVcdThGQzc1MDBrYlx1OEI2Nlx1NTQ0QVxuICAgICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA0MDAwLFxuICAgICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgICAvLyBcdTk3NTlcdTYwMDFcdThENDRcdTZFOTBcdTUyMDZcdTdDN0JcdTYyNTNcdTUzMDVcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdzdGF0aWMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdzdGF0aWMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgdnVlKCksXG4gICAgICBjcmVhdGVIdG1sUGx1Z2luKHtcbiAgICAgICAgbWluaWZ5OiB0cnVlLFxuICAgICAgICAvKipcbiAgICAgICAgICogQWZ0ZXIgd3JpdGluZyBlbnRyeSBoZXJlLCB5b3Ugd2lsbCBub3QgbmVlZCB0byBhZGQgc2NyaXB0IHRhZ3MgaW4gYGluZGV4Lmh0bWxgLCB0aGUgb3JpZ2luYWwgdGFncyBuZWVkIHRvIGJlIGRlbGV0ZWRcbiAgICAgICAgICogQGRlZmF1bHQgc3JjL21haW4udHNcbiAgICAgICAgICovXG4gICAgICAgIGVudHJ5OiAnc3JjL21haW4udHMnLFxuICAgICAgICAvKipcbiAgICAgICAgICogSWYgeW91IHdhbnQgdG8gc3RvcmUgYGluZGV4Lmh0bWxgIGluIHRoZSBzcGVjaWZpZWQgZm9sZGVyLCB5b3UgY2FuIG1vZGlmeSBpdCwgb3RoZXJ3aXNlIG5vIGNvbmZpZ3VyYXRpb24gaXMgcmVxdWlyZWRcbiAgICAgICAgICogQGRlZmF1bHQgaW5kZXguaHRtbFxuICAgICAgICAgKi9cbiAgICAgICAgdGVtcGxhdGU6ICdpbmRleC5odG1sJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogRGF0YSB0aGF0IG5lZWRzIHRvIGJlIGluamVjdGVkIGludG8gdGhlIGluZGV4Lmh0bWwgZWpzIHRlbXBsYXRlXG4gICAgICAgICAqL1xuICAgICAgICBpbmplY3Q6IHtcbiAgICAgICAgICBkYXRhOiBlbnYsXG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICBdLFxuICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFpVixZQUFZLFVBQVU7QUFFdlcsT0FBTyxhQUFhO0FBRXBCLE9BQU8sU0FBUztBQUNoQixPQUFPLGtCQUFrQjtBQUN6QixPQUFPLGlCQUFpQjtBQUN4QixTQUFnQyxjQUFjLGVBQWU7QUFDN0QsU0FBUyx3QkFBd0I7QUFSakMsSUFBTSxtQ0FBbUM7QUFVekMsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxTQUFTLEtBQUssTUFBNkI7QUFDeEUsUUFBTSxPQUFPLFFBQVEsSUFBSTtBQUN6QixRQUFNLE1BQU0sUUFBUSxNQUFNLEdBQUcsSUFBSSxjQUFjO0FBQy9DLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFdBQVc7QUFBQTtBQUFBLElBQ1gsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBVSxhQUFRLGtDQUFXLEtBQUs7QUFBQSxNQUNwQztBQUFBLElBQ0Y7QUFBQSxJQUNBLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQSxRQUNQLFNBQVM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsU0FBUyxDQUFBQSxVQUFRQSxNQUFLLFFBQVEsVUFBVSxFQUFFO0FBQUEsUUFDNUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBO0FBQUEsTUFFWCx1QkFBdUI7QUFBQSxNQUN2QixlQUFlO0FBQUE7QUFBQSxRQUViLFFBQVE7QUFBQSxVQUNOLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxJQUNBLFNBQVM7QUFBQSxNQUNQLElBQUk7QUFBQSxNQUNKLGlCQUFpQjtBQUFBLFFBQ2YsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsUUFLUixPQUFPO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtQLFVBQVU7QUFBQTtBQUFBO0FBQUE7QUFBQSxRQUtWLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIl0KfQo=
