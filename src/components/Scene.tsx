import { Flex } from '@chakra-ui/react';
import { useAppContext } from '@peach/contexts';
import { useEffect, useRef } from 'react';

export default function Scene() {
  const ref = useRef<HTMLDivElement>(null);
  const { app } = useAppContext();

  function resize() {
    /* при изменении размеров окна, флекс-контейнер не уменьшается из-за вложенного элемента,
    поэтому размеры элемента заведомо устанавливаются меньше флекс-контейнера*/
    app.cancelResize();
    app.view.width = 0;
    app.view.height = 0;
    app.resize();
  }

  useEffect(() => {
    if (!ref.current) return;
    app.resizeTo = ref.current;
    ref.current.appendChild(app.view);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      app.view.remove();
      app.destroy();
    };
  }, [app, ref]);

  return <Flex ref={ref} flexBasis="100%"></Flex>;
}
