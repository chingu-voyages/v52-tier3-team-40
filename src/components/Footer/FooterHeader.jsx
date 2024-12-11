function FooterHeader() {
  return (
    <div
      className="flex flex-col items-center sm:items-start sm:flex-row  
     justify-between
     w-full px-10">
      <div className="flex flex-col text-xl">
        <span className="text-5xl font-bold text-teal-400 dark:text-footerBackgroundColor">
          Lets
        </span>
        <span className="text-5xl font-bold text-teal-400 pl-7">
          Connect
        </span>
      </div>
    </div>
  );
}

export default FooterHeader;
