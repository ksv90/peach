import { createContext, useContext, useReducer } from 'react';
import { elementsReducer, createElementsReducerState } from './reducer';
import {
  AnimationPayload,
  AppProviderProps,
  ElementsContextState,
  ElementsReducerrTypes,
  CurrentAnimationPayload,
  CurrentSkeletonPayload,
  SkeletonPayload,
} from './types';

export const ElementsContext = createContext({} as ElementsContextState);

export const useElementsContext = () => useContext(ElementsContext);

export const ElementsProvider = ({ children }: AppProviderProps) => {
  const [state, dispatch] = useReducer(elementsReducer, createElementsReducerState());

  const elementsContext: ElementsContextState = {
    ...state,
    addSkeleton(payload: SkeletonPayload) {
      dispatch({ type: ElementsReducerrTypes.AddSkeleton, payload });
    },
    addAnimation(payload: AnimationPayload) {
      dispatch({ type: ElementsReducerrTypes.AddAnimation, payload });
    },
    setSkeletonProps(payload: CurrentSkeletonPayload) {
      dispatch({ type: ElementsReducerrTypes.SetSkeletonProps, payload });
    },
    setAnimationProps(payload: CurrentAnimationPayload) {
      dispatch({ type: ElementsReducerrTypes.SetAnimationProps, payload });
    },
  };

  return <ElementsContext.Provider value={elementsContext}>{children}</ElementsContext.Provider>;
};
