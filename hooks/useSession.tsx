import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { Session, User } from "@supabase/supabase-js";

const Context = createContext<null | any>(null);

export const SessionContext = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <Context.Provider value={{ user: session?.user, session }}>
      {children}
    </Context.Provider>
  );
};

const useSession = () => useContext<{ user: User; session: Session }>(Context);
export default useSession;
