import { createContext, useContext, useReducer } from 'react';
import { useAppContext } from '../AppContext';
import { elementsReducer, createElementsReducerState } from './reducer';
import {
  AddAnimationPayload,
  AppProviderProps,
  ElementsContextState,
  ElementsReducerTypes,
  UpdateSkeletonsPayload,
  UpdateBitmapFontsPayload,
  AddBitmapTextPayload,
  CurrentElementPayload,
} from './types';

export const ElementsContext = createContext({} as ElementsContextState);

export const useElementsContext = () => useContext(ElementsContext);

export const ElementsProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(elementsReducer, createElementsReducerState());
  const { app } = useAppContext();

  const elementsContext: ElementsContextState = {
    ...state,
    updateSkeletons(payload: UpdateSkeletonsPayload) {
      dispatch({ type: ElementsReducerTypes.UpdateSkeletons, payload });
    },
    updateBitmapFonts(payload: UpdateBitmapFontsPayload) {
      dispatch({ type: ElementsReducerTypes.UpdateBitmapFonts, payload });
    },
    addAnimation(payload: AddAnimationPayload) {
      dispatch({ type: ElementsReducerTypes.AddAnimation, payload, app });
    },
    addBitmapText(payload: AddBitmapTextPayload) {
      dispatch({ type: ElementsReducerTypes.AddBitmapText, payload, app });
    },
    setCurrentElement(payload: CurrentElementPayload) {
      dispatch({ type: ElementsReducerTypes.SetCurrentElement, payload });
    },
  };

  return <ElementsContext.Provider value={elementsContext}>{children}</ElementsContext.Provider>;
};
