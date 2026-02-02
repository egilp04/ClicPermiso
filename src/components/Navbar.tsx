export interface NavbarInterface {
  texto?: string;
  //   button: ReactNode;
}

export const Navbar = ({ texto }: NavbarInterface) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="h-28 w-48">
          <img src="src/assets/img/logo.jpg" className="w-full h-full"></img>
        </div>
        <div className="flex flex-row w-full justify-between pr-10 pl-10">
          <h2 className="font-bold">I.E.S Albarregas</h2>
          <div className="flex flex-row gap-4">
            <label>{texto}</label>
            <span className="material-symbols-outlined">exit_to_app</span>
          </div>
        </div>
      </div>
      <hr className="opacity-[.15]"></hr>
    </>
  );
};
