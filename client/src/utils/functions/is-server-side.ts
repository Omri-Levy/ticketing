// is server-side if window is undefined, otherwise is client-side.
const isServerSide = () => typeof window === `undefined`;

export default isServerSide;
