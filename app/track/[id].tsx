
import { useRouter } from 'next/router';

export default function Page() {
    const router = useRouter();
    return (
        <p>Track: {router.query.id}</p>
    );
}