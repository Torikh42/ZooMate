import { User as AuthUser, Session } from "@supabase/supabase-js";
import * as Linking from "expo-linking";
import React, { createContext, useContext, useEffect, useState } from "react";
import { User as Profile } from "../types/user"; 
import { supabase } from "../utils/supabase";   

export type Profesi = "zookeeper" | "supervisor" | "dokter";

interface SignUpArgs {
  email: string;
  password: string;
  full_name: string;
  tanggal_lahir: string;
  profesi: Profesi;
  phone_number: string;
  address: string;
}

interface SignInArgs {
  email: string;
  password: string;
}

interface AuthContextType {
  session: Session | null;
  user: AuthUser | null;
  profile: Profile | null;
  loading: boolean;
  signUp: (args: SignUpArgs) => Promise<any>;
  signIn: (args: SignInArgs) => Promise<any>;
  signOut: () => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        const { data: userProfile } = await supabase
          .from("user")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(userProfile as Profile | null);
      }
      setLoading(false);
    };

    fetchInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        console.log("Auth state change event:", _event);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const { data: userProfile } = await supabase
            .from("user")
            .select("*")
            .eq("id", session.user.id)
            .single();
          setProfile(userProfile as Profile | null);
        } else {
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async ({
    email,
    password,
    full_name,
    tanggal_lahir,
    profesi,
    phone_number,
    address,
  }: SignUpArgs) => {
    const redirectTo = Linking.createURL("/login");
    console.log("Redirect URL for email:", redirectTo);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: redirectTo,
      },
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      const { error: profileError } = await supabase.from("user").insert({
        id: data.user.id,
        full_name,
        tanggal_lahir,
        profesi,
        email,
        phone_number, 
        address
      });

      if (profileError) {
        console.error("Failed to create user profile:", profileError);
        throw profileError;
      }
    } else {
      throw new Error("Sign up completed, but no user data returned.");
    }

    return { data, error: null };
  };

  const signIn = async ({ email, password }: SignInArgs) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  };

  const value = {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}


export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}