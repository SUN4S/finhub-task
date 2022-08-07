import "./CenterContainer.scss";

export const CenterContainer = (props: { children: JSX.Element }) => {
  return <div className="centerContainer">{props.children}</div>;
};
