import '@/styles/var.scss';
import '@/styles/global.scss';
import { UserProvider } from '@/contexts/user.context';
export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />
        </UserProvider>
    );
}
