import { createContext, useContext, useReducer } from 'react';
import { useAppContext } from '../AppContext';
import { elementsReducer, createElementsReducerState } from './reducer';
import {
  AnimationPayload,
  AppProviderProps,
  ElementsContextState,
  ElementsReducerrTypes,
  UpdateSkeletonsPayload,
  UpdateBitmapFontsPayload,
  BitmapTextPayload,
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
      dispatch({ type: ElementsReducerrTypes.UpdateSkeletons, payload });
    },
    updateBitmapFonts(payload: UpdateBitmapFontsPayload) {
      dispatch({ type: ElementsReducerrTypes.UpdateBitmapFonts, payload });
    },
    addAnimation(payload: AnimationPayload) {
      dispatch({ type: ElementsReducerrTypes.AddAnimation, payload, app });
    },
    addBitmapText(payload: BitmapTextPayload) {
      dispatch({ type: ElementsReducerrTypes.AddBitmapText, payload, app });
    },
    setCurrentElement(payload: CurrentElementPayload) {
      dispatch({ type: ElementsReducerrTypes.SetCurrentElement, payload });
    },
  };

  return <ElementsContext.Provider value={elementsContext}>{children}</ElementsContext.Provider>;
};
