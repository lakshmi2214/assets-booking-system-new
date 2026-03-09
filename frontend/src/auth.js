import { Capacitor } from '@capacitor/core';

// Direct API call to Django backend
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('192.168.');
const isVercel = hostname.includes('vercel.app');

// Priority:
// 1. Environment variable (standard practice)
// 2. Localhost (for web development)
// 3. Current origin (if both on same domain)
// 4. Fallbacks
export const API_BASE = process.env.REACT_APP_API_URL ||
    (isLocalhost ? 'http://127.0.0.1:8050' :
        (isVercel ? 'https://assets-backend-lakshmi2214.vercel.app' :
            `https://${hostname.replace('frontend', 'backend')}`));



// Standalone mode should be FALSE by default so it uses the REAL backend
if (localStorage.getItem('standalone_mode') === null) {
    localStorage.setItem('standalone_mode', 'false');
}

export const isStandaloneMode = () => localStorage.getItem('standalone_mode') === 'true';

export function setStandaloneMode(value) {
    localStorage.setItem('standalone_mode', value ? 'true' : 'false');
    // Force logout when switching modes to prevent token mismatch
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}

export const MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImRlbW9fdXNlciJ9.signature';

// Persistent Local Database Simulation
const getLocalData = (key, defaultVal = []) => {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultVal;
};

const setLocalData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export async function mockLogin(username, password) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                json: async () => ({
                    access: MOCK_TOKEN,
                    refresh: 'refresh_token',
                    user: { username: username || 'user', id: 1 }
                })
            });
        }, 300);
    });
}

export async function mockSignup(userData) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                status: 201,
                json: async () => ({
                    id: Math.floor(Math.random() * 1000),
                    username: userData.username,
                    email: userData.email,
                    detail: 'Registration successful'
                })
            });
        }, 500);
    });
}

export function clearTokens() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
}

export function getStoredAccessToken() {
    const token = localStorage.getItem('access');
    if (token && typeof token === 'string' && token.includes('.')) {
        return token;
    }
    return null;
}

export function getStoredRefreshToken() {
    const token = localStorage.getItem('refresh');
    if (token && typeof token === 'string' && token.length > 0) {
        return token;
    }
    return null;
}

export async function refreshAccessToken() {
    const refresh = getStoredRefreshToken();
    if (!refresh) return null;

    if (isStandaloneMode()) return MOCK_TOKEN;

    const response = await fetch(`${API_BASE}/api/v1/auth/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh }),
    });
    if (!response.ok) {
        clearTokens();
        return null;
    }
    const data = await response.json();
    if (data.access) {
        localStorage.setItem('access', data.access);
        return data.access;
    }
    clearTokens();
    return null;
}

export async function getValidAccessToken() {
    const current = getStoredAccessToken();
    if (current) return current;
    return await refreshAccessToken();
}

export async function authorizedFetch(url, options = {}, allowRetry = true) {
    if (isStandaloneMode()) {
        return new Promise(resolve => {
            setTimeout(() => {
                const isBooking = url.includes('/bookings/');
                const isAsset = url.includes('/assets/');

                if (options.method === 'POST') {
                    const body = JSON.parse(options.body || '{}');
                    if (isBooking) {
                        const bookings = getLocalData('local_bookings');
                        const newBooking = {
                            ...body,
                            id: Math.floor(Math.random() * 10000),
                            status: 'pending',
                            created_at: new Date().toISOString()
                        };
                        // Hydrate asset details for the UI
                        import('./mockData').then(m => {
                            const asset = m.MOCK_ASSETS.find(a => a.id === body.asset_id);
                            newBooking.asset = asset;
                            setLocalData('local_bookings', [newBooking, ...bookings]);
                        });
                        resolve({
                            ok: true,
                            status: 201,
                            json: async () => newBooking
                        });
                        return;
                    }
                }

                if (options.method === 'GET' || !options.method) {
                    if (isBooking) {
                        resolve({
                            ok: true,
                            status: 200,
                            json: async () => getLocalData('local_bookings')
                        });
                        return;
                    }
                    if (isAsset) {
                        import('./mockData').then(m => {
                            resolve({
                                ok: true,
                                status: 200,
                                json: async () => m.MOCK_ASSETS
                            });
                        });
                        return;
                    }
                }

                // Default success response
                resolve({
                    ok: true,
                    status: 200,
                    json: async () => (url.endsWith('/') ? [] : {})
                });
            }, 400);
        });
    }

    const requestOptions = { ...options };
    requestOptions.headers = { ...(options.headers || {}) };
    let token = await getValidAccessToken();
    if (!token) throw new Error('AUTH_REQUIRED');
    requestOptions.headers.Authorization = `Bearer ${token}`;

    let response;
    try {
        response = await fetch(url, requestOptions);
    } catch (err) {
        // Stop silent fallback to standalone
        throw err;
    }

    if (response.status === 401 && allowRetry) {
        token = await refreshAccessToken();
        if (!token) {
            clearTokens();
            return response;
        }
        requestOptions.headers.Authorization = `Bearer ${token}`;
        response = await fetch(url, requestOptions);
    }
    return response;
}
