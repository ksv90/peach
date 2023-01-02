import { Flex } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';
import { useAppContext } from '../contexts';

export default function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { app } = useAppContext();
  useEffect(() => {
    if (!ref.current) return;
    app.stage.width = app.view.width = ref.current.offsetWidth;
    app.stage.height = app.view.height = ref.current.offsetHeight;
    ref.current.appendChild(app.view);
    return () => {
      app.view.remove();
      app.destroy();
    };
  }, [app, ref]);

  return <Flex ref={ref} flexBasis="100%"></Flex>;
}
