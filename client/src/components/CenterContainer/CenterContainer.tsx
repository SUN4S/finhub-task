import "./CenterContainer.scss";

// Simple component that center children components
export const CenterContainer = (props: { children: JSX.Element }) => {
  return <div className="centerContainer">{props.children}</div>;
};
