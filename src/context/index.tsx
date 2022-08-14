import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { JsxElement } from 'typescript';

interface Modal {
  open: boolean;
  header: JsxElement | null;
  body: JsxElement | null;
  footer: JsxElement | null;
}

interface Context {
  User: UserProps | null;
  Modal: Modal;
  openModal: (() => void) | null;
  closeModal: (() => void) | null;
}

const initial: Context = {
  User: null,
  Modal: {
    open: false,
    header: null,
    body: null,
    footer: null,
  },
  openModal: null,
  closeModal: null,
};

const AppContext = createContext<Record<keyof Context, any>>(initial);
export const useAppContext = () => useContext(AppContext);

export const ContextProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<Context['User']>(initial.User);
  const [modal, setModal] = useState<Context['Modal']>(initial.Modal);

  const openModal = useCallback(
    (data: Partial<Omit<Modal, 'open'>>) =>
      setModal((prev) => ({ ...initial.Modal, ...data, open: true })),
    [],
  );
  const closeModal = useCallback(() => setModal((prev) => ({ ...prev, open: false })), []);

  const value = useMemo(
    (): Record<keyof Context, any> => ({
      User: [user, setUser],
      Modal: [modal, setModal],
      openModal,
      closeModal,
    }),
    [user, modal, openModal, closeModal],
  );
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
