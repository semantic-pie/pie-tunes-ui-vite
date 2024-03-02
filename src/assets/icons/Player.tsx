const Player = (props: preact.JSX.HTMLAttributes<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 27 27"
      {...props}
    >
      <path
        d="M13.2917 26.6867C20.441 26.6867 26.3421 20.7857 26.3421 13.6489C26.3421 6.51215 20.4284 0.611084 13.2791 0.611084C6.1423 0.611084 0.253845 6.51215 0.253845 13.6489C0.253845 20.7857 6.15491 26.6867 13.2917 26.6867ZM13.2917 24.0893C7.50409 24.0893 2.87654 19.4365 2.87654 13.6489C2.87654 7.86132 7.50409 3.22117 13.2791 3.22117C19.0666 3.22117 23.7194 7.86132 23.732 13.6489C23.7446 19.4365 19.0793 24.0893 13.2917 24.0893ZM18.184 14.355C18.7136 14.0524 18.701 13.2832 18.184 12.9806L10.9212 8.69353C10.3664 8.3783 9.63503 8.64309 9.63503 9.26094V18.0621C9.63503 18.6799 10.3285 18.9826 10.9212 18.6295L18.184 14.355Z"
        fill="white"
      />
    </svg>
  );
};

export default Player;
