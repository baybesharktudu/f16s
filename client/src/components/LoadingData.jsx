import AnimateLoading from './AnimateLoading';

export default function LoadingData() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            <AnimateLoading />
            <AnimateLoading />
            <AnimateLoading />
        </div>
    );
}
