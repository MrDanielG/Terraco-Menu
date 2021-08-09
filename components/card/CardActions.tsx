import React from "react";

interface Props {}

interface ActionProps {
  icon?: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CardActionTop = (props: ActionProps) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full h-14 bg-brown-light rounded-bl-3xl text-white text-3xl mb-1 flex items-center justify-center md:w-20 md:mb-0 md:rounded-tl-3xl md:rounded-bl-none md:float-right"
    >
      {props.icon}
    </button>
  );
};

const CardActionBottom = (props: ActionProps) => {
  return (
    <button
      onClick={props.onClick}
      className="w-full h-14 bg-brown-light rounded-tl-3xl text-white text-2xl mt-1 flex items-center justify-center md:w-20 md:mt-0 md:rounded-tr-3xl md:rounded-tl-none md:float-left"
    >
      {props.icon}
    </button>
  );
};

const CardActions: React.FC<Props> & {
  Top: typeof CardActionTop;
  Bottom: typeof CardActionBottom;
} = (props: Props) => {
  return (
    <>
      <div className="w-32 h-auto float-right md:w-full flex flex-wrap content-between md:block">
        {props.children}
      </div>
    </>
  );
};

CardActions.Top = CardActionTop;
CardActions.Bottom = CardActionBottom;

export default CardActions;
