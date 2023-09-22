class AuthService {
    setAccessToken(val: string): void {
        window.localStorage.setItem('accessToken', val);
    }
    getAccessToken(): string {
        return window.localStorage.getItem('accessToken') as string;
    }
    clearAccessToken(): void {
        window.localStorage.removeItem('accessToken');
    }
}
const auth_service = new AuthService();
export default auth_service;
