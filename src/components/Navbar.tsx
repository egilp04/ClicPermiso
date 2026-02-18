import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";
import { supabase } from "../supabase/supabase";

export interface NavbarInterface {
  texto?: string;
  //   button: ReactNode;
}

export const Navbar = ({ texto }: NavbarInterface) => {
  const session = useAuthStore((state) => state.session);
  const signOut = useAuthStore((state) => state.signOut);
  const user = useAuthStore((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    signOut();
  };

  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <div className="h-28 w-48">
          <img src="src/assets/img/logo.jpg" className="w-full h-full"></img>
        </div>
        <div className="flex flex-row w-full justify-between pr-10 pl-10">
          <h2 className="font-bold">I.E.S Albarregas</h2>
          <div className="flex flex-row gap-10">
            <label>{user?.email}</label>
            {session ? (
              <span
                className="material-symbols-outlined"
                onClick={handleLogout}
              >
                exit_to_app
              </span>
            ) : (
              <div className="flex flex-row gap-2">
                <button
                  type="button"
                  onClick={() => navigate("login")}
                  className="bg-purple-300"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate("registrarse")}
                  className="bg-purple-300"
                >
                  Registrarse
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <hr className="opacity-[.15]"></hr>
    </>
  );
};
