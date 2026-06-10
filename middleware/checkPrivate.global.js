const PROFILE_FETCH_TIMEOUT_MS = 10_000;

export default defineNuxtRouteMiddleware(async (to, from) => {
    const user = useUser();

    if (user.info !== null) {
        return R().guard(to, from, true);
    }

    const hasAuthCookies = Boolean(user.token?.value || user.refresh_token?.value);
    const shouldFetchProfile = Boolean(to.meta?.private || hasAuthCookies);

    if (shouldFetchProfile) {
        try {
            await Promise.race([
                user.getInfo(),
                new Promise((_, reject) => {
                    setTimeout(() => reject(new Error('profile-timeout')), PROFILE_FETCH_TIMEOUT_MS);
                }),
            ]);
        } catch {
            if (user.info === null) {
                user.info = false;
            }
        }
    }

    return R().guard(to, from, true);
});