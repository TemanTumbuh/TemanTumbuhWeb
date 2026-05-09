"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

import { User, AuthContextType } from "@/types/feed.types";
import { DUMMY_USERS } from "@/config/feedConfig";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getInitialUser(): User | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedUser = localStorage.getItem("currentUser");

    return storedUser ? JSON.parse(storedUser) : null;
  } catch (error) {
    console.error("Failed to parse user", error);

    localStorage.removeItem("currentUser");

    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(getInitialUser);

  const isLoggedIn = !!currentUser;

  const login = useCallback(
    async (email: string, password: string): Promise<User | null> => {
      // simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 700));

      const validUsers = [
        {
          email: "user1@gmail.com",
          password: "user1",
          user: DUMMY_USERS[1],
        },
        {
          email: "user2@gmail.com",
          password: "user2",
          user: DUMMY_USERS[2],
        },
        {
          email: "user3@gmail.com",
          password: "user3",
          user: DUMMY_USERS[3],
        },
        {
          email: "user4@gmail.com",
          password: "user4",
          user: DUMMY_USERS[4],
        },
        {
          email: "admin@gmail.com",
          password: "admin123",
          user: DUMMY_USERS[0],
        },
      ];

      const matchedUser = validUsers.find(
        (item) => item.email === email && item.password === password,
      );

      if (!matchedUser) {
        return null;
      }

      setCurrentUser(matchedUser.user);

      localStorage.setItem("currentUser", JSON.stringify(matchedUser.user));

      return matchedUser.user;
    },
    [],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);

    localStorage.removeItem("currentUser");
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }

  return context;
};
