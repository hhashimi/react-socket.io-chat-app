const ChannelsMenu = ({ channel, setChannel, showChannelsMenu }) => {
  const channels = ["TypeScript", "Node", "React", "Vue", "Angular"];

  return (
    <>
      <div
        className={`bg-white rounded-3xl my-2 mb-5 w-full sm:flex flex-col sm:self-center sm:w-1/3 p-2 h-52 ${
          !showChannelsMenu ? "hidden" : ""
        }`}
      >
        <p className="text-2xl">Channels</p>
        <hr className="mt-2" />
        <ul className="cursor-pointer mt-2 space-y-3 text-md">
          {channels.map((channelName, index) => {
            return (
              <li
                key={index}
                className={`hover:bg-green-100 rounded-md px-2 ${
                  channel === channelName ? "bg-green-50" : ""
                }`}
                onClick={() => {
                  setChannel(channelName);
                }}
              >
                {channelName}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ChannelsMenu;
