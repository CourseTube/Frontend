"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import { mockCourses } from "@/lib/mock-data";
import type { AppStateContext, Course, User } from "@/types";
import type { ReactNode } from "react";

type StoredState = {
  createdCourses: Course[];
  purchasedCourses: string[];
  user: User | null;
};

const STORAGE_KEY = "coursetube:app-state";
const CHANGE_EVENT = "coursetube:storage-change";
const EMPTY_STATE: StoredState = { createdCourses: [], purchasedCourses: [], user: null };
const AppContext = createContext<AppStateContext | null>(null);

function subscribe(callback: () => void) {
  window.addEventListener(CHANGE_EVENT, callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener(CHANGE_EVENT, callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot() {
  return localStorage.getItem(STORAGE_KEY);
}

function getServerSnapshot() {
  return null;
}

function readState(serialized: string | null): StoredState {
  if (!serialized) return EMPTY_STATE;
  const parsed = JSON.parse(serialized) as Partial<StoredState>;
  return {
    createdCourses: Array.isArray(parsed.createdCourses) ? parsed.createdCourses : [],
    purchasedCourses: Array.isArray(parsed.purchasedCourses) ? parsed.purchasedCourses : [],
    user: parsed.user && typeof parsed.user.email === "string" ? parsed.user : null,
  };
}

function writeState(state: StoredState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function AppProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const storedState = useMemo(() => readState(snapshot), [snapshot]);
  const courses = useMemo(() => [...storedState.createdCourses, ...mockCourses], [storedState.createdCourses]);

  const signIn = useCallback((user: User) => {
    writeState({ ...readState(getSnapshot()), user });
  }, []);

  const signOut = useCallback(() => {
    writeState({ ...readState(getSnapshot()), user: null });
  }, []);

  const purchaseCourse = useCallback((courseId: string) => {
    const state = readState(getSnapshot());
    if (!state.purchasedCourses.includes(courseId)) {
      writeState({ ...state, purchasedCourses: [...state.purchasedCourses, courseId] });
    }
  }, []);

  const addCourse = useCallback((course: Course) => {
    const state = readState(getSnapshot());
    const persistedCourse: Course = { ...course, trailerUrl: undefined };
    writeState({ ...state, createdCourses: [persistedCourse, ...state.createdCourses] });
  }, []);

  const value = useMemo(
    () => ({
      courses,
      purchasedCourses: storedState.purchasedCourses,
      user: storedState.user,
      signIn,
      signOut,
      purchaseCourse,
      addCourse,
    }),
    [courses, storedState, signIn, signOut, purchaseCourse, addCourse],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp має використовуватися всередині AppProvider");
  return context;
}
