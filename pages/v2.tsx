import HomePage from '@/components/v2';

type Props = {
    lastBuild: string;
};

export default function Index({ lastBuild }: Props) {
    return <HomePage lastBuild={lastBuild} />;
}

export async function getStaticProps() {
    return {
        props: {
            lastBuild: new Date().toUTCString()
        }
    };
}
