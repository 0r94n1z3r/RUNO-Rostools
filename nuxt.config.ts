import app from "./nuxt-config/app.js";
import hooks from "./nuxt-config/hooks.js";
import compression from 'vite-plugin-compression2';

/**hydration mismatch + source maps. */
const debugHydration = process.env.NUXT_DEBUG_HYDRATION === '1';

const devApiProxyTarget = process.env.NUXT_DEV_API_TARGET || 'http://127.0.0.1:8009';

function ensureApiSuffix(base: string): string {
    const raw = base.trim().replace(/\/+$/, '');
    if (raw.endsWith('/api')) {
        return raw;
    }
    if (raw.startsWith('/') && !raw.startsWith('//')) {
        return raw === '' ? '/api' : `${raw}/api`;
    }
    return `${raw}/api`;
}

const trimmedBase = (process.env.BASE_URL ?? '').trim();
const publicBaseURL = trimmedBase ? ensureApiSuffix(trimmedBase) : '/api';

const trimmedNuxtApi = (process.env.NUXT_API_BASE_URL ?? '').trim();
const apiBaseURL = trimmedNuxtApi ? ensureApiSuffix(trimmedNuxtApi) : '';

let siteHost = '';
if (publicBaseURL.startsWith('http')) {
    try {
        siteHost = new URL(publicBaseURL).host;
    } catch {
        /* ignore */
    }
}
if (!siteHost) {
    siteHost = (process.env.NUXT_PUBLIC_SITE_HOST ?? '').trim();
}

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    app,
    hooks,

    devtools: {
      enabled: true,
    },

    future: {
        compatibilityVersion: 3, 
    },

    components: [
        {
            path: '~/components',
            pathPrefix: false,
        },
    ],
    modules: [
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'nuxt-swiper',
		'nuxt-countdown',
		[
			'dayjs-nuxt',
			{
				autoImports: ['useDayjs'],
				plugins: ['customParseFormat']
			}
		],
		[
			'yandex-metrika-module-nuxt3',
			{
				id: 109720959,
				ssr:true, 
				webvisor:true, 
				clickmap:true, 
				ecommerce:"dataLayer",
				accurateTrackBounce:true, 
				trackLinks:true
			}
		],
		'@nuxt/eslint',
		'nuxt-svgo',
		'nuxt-anime'
    ],

    svgo: {
        autoImportPath: './assets/icons/icons',
        customComponent: 'Icon',
        componentPrefix: 'Icon'
    },

    imports: {
        dirs: [
            'helpers'
        ]
    },
    css: [
        '@/assets/scss/main.scss',
    ],
    runtimeConfig: {
        apiBaseURL,
        public: {
            baseURL: publicBaseURL,
            siteHost,
        },
    },

    nitro: {
        devProxy: {
            '/api': { target: devApiProxyTarget, changeOrigin: true },
        },
    },

    vite: {
        plugins: [compression()],
        optimizeDeps: {
            include: ['@popperjs/core'],
        },
        resolve: {
            dedupe: ['@popperjs/core'],
        },
        ssr: {
            noExternal: ['v-calendar', '@popperjs/core'],
        },
        define: {
            ...(debugHydration
                ? { __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: true }
                : {}),
        },
        build: {
            sourcemap: debugHydration,
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/assets/scss/_global.scss" as *;
                    `
                }
            },
        },
        server: {
            watch: { ignored: ['**/node_modules/**', '**/.nuxt/**', '**/.output/**'] }
        }
    },
})