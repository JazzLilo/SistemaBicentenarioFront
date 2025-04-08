import { atom } from "jotai";
import { EventHistorico, Historia, Presidente, Cultura } from "@/components/interface";

export const eventohistoricoAtom = atom<EventHistorico >()
export const historiaAtom = atom<Historia>()
export const presidenteAtom = atom<Presidente>()
export const culturaAtom = atom<Cultura>()