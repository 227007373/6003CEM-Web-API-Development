import '@/styles/var.scss';
import '@/styles/global.scss';
import Auth from '@/components/auth';
import { UserProvider } from '@/contexts/user.context';
export default function App({ Component, pageProps }) {
    return (
        <UserProvider>
            <Auth>
                <Component {...pageProps} />
            </Auth>
        </UserProvider>
    );
}
