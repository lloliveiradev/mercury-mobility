import ReactPlayer from "react-player/youtube";
function Main() {
    return (
        <div className="flex p-24 md:px-56 md:pt-48 md:pb-24">
            <main className="w-full min-h-full lg:max-w-648">
            </main>
        </div>
    )
}

const MyVideo = () => {
    return (
        <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' playing={true} volume={0.5} />
    );
};

export default Main