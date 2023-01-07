import { createContext, useContext, useReducer } from 'react';
import { useAppContext } from '../appContext';
import { elementsReducer, createElementsReducerState } from './reducer';
import {
  AddAnimationPayload,
  ElementsContextState,
  ElementsReducerTypes,
  AddBitmapTextPayload,
  CurrentElementPayload,
  AddTextPayload,
  AppProviderProps,
  AddSpritePayload,
} from './types';

export const ElementsContext = createContext({} as ElementsContextState);

export const useElementsContext = () => useContext(ElementsContext);

export const ElementsProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(elementsReducer, createElementsReducerState());
  const { app } = useAppContext();

  const elementsContext: ElementsContextState = {
    ...state,
    addAnimation(payload: AddAnimationPayload) {
      dispatch({ type: ElementsReducerTypes.AddAnimation, payload, app });
    },
    addBitmapText(payload: AddBitmapTextPayload) {
      dispatch({ type: ElementsReducerTypes.AddBitmapText, payload, app });
    },
    addText(payload: AddTextPayload) {
      dispatch({ type: ElementsReducerTypes.AddText, payload, app });
    },
    addSprite(payload: AddSpritePayload) {
      dispatch({ type: ElementsReducerTypes.AddSprite, payload, app });
    },
    setCurrentElement(payload: CurrentElementPayload) {
      dispatch({ type: ElementsReducerTypes.SetCurrentElement, payload });
    },
  };

  return <ElementsContext.Provider value={elementsContext}>{children}</ElementsContext.Provider>;
};
