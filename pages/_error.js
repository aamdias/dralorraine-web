import Error from "next/error";
// Error pages can also be served on the private host; never initialize trackers.
export default function AppError(props) {
    return <Error {...props} />;
}
AppError.getInitialProps = Error.getInitialProps;
AppError.isCRM = true;
