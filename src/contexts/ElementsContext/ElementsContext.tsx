import { createContext, useContext, useReducer } from 'react';
import { useAppContext } from '../AppContext';
import { elementsReducer, createElementsReducerState } from './reducer';
import {
  AnimationPayload,
  AppProviderProps,
  ElementsContextState,
  ElementsReducerrTypes,
  CurrentAnimationPayload,
  CurrentSkeletonPayload,
  UpdateSkeletonsPayload,
  UpdateBitmapFontsPayload,
  BitmapTextPayload,
  CurrentBitmapTextPayload,
} from './types';

export const ElementsContext = createContext({} as ElementsContextState);

export const useElementsContext = () => useContext(ElementsContext);

export const ElementsProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(elementsReducer, createElementsReducerState());
  const { app } = useAppContext();

  const elementsContext: ElementsContextState = {
    ...state,
    updateSkeletons(payload: UpdateSkeletonsPayload) {
      dispatch({ type: ElementsReducerrTypes.UpdateSkeletons, payload });
    },
    updateBitmapFonts(payload: UpdateBitmapFontsPayload) {
      dispatch({ type: ElementsReducerrTypes.UpdateBitmapFonts, payload });
    },
    addAnimation(payload: AnimationPayload) {
      dispatch({ type: ElementsReducerrTypes.AddAnimation, payload });
    },
    addBitmapText(payload: BitmapTextPayload) {
      dispatch({ type: ElementsReducerrTypes.AddBitmapText, payload, app });
    },
    setSkeletonProps(payload: CurrentSkeletonPayload) {
      dispatch({ type: ElementsReducerrTypes.SetSkeletonProps, payload });
    },
    setAnimationProps(payload: CurrentAnimationPayload) {
      dispatch({ type: ElementsReducerrTypes.SetAnimationProps, payload });
    },
    setBitmapFontProps(payload: string) {
      dispatch({ type: ElementsReducerrTypes.SetBitmapFontProps, payload });
    },
    setBitmapTextProps(payload: CurrentBitmapTextPayload) {
      dispatch({ type: ElementsReducerrTypes.SetBitmapTextProps, payload });
    },
  };

  return <ElementsContext.Provider value={elementsContext}>{children}</ElementsContext.Provider>;
};
