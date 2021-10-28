const ChannelsMenuToggle = ({ toggleChannelsMenu }) => {
  return (
    <>
      <span
        className="sm:hidden p-2 flex cursor-pointer"
        onClick={toggleChannelsMenu}
      >
        <svg
          className="block h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <p className="mx-2">Channels</p>
      </span>
    </>
  );
};

export default ChannelsMenuToggle;
