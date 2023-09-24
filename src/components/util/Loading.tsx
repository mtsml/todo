import { FC, ReactNode } from "react";


type Props = {
    loading: boolean,
    children: ReactNode
}


const Loading: FC<Props> = ({ loading, children }) => {
    return (
        loading
            ? <div
                className="loading"
            >
                Loading...
            </div>
            : <>{children}</>
    );
}


export default Loading;