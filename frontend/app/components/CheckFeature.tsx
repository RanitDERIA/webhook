export const CheckFeature = ({ label }: { label: string }) => {
    return (
      <div className="flex items-center">
        <div className="pr-2">
          <CheckMark />
        </div>
        {label}
      </div>
    );
  };
  
  function CheckMark() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="green"
        className="size-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75l2.25 2.25 4.5-6"
        />
      </svg>
    );
  }
  