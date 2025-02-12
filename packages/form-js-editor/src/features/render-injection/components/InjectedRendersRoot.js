import { Fragment } from 'preact';
import { useMemo } from 'preact/hooks';
import { useService } from '../../../render/hooks';
import { Fill, Slot } from '../slot-fill';

/**
 * A functional component that holds all injected renderers.
 * @returns {any} The rendered component.
 */
export const InjectedRendersRoot = () => {
  const renderInjector = useService('renderInjector');

  const injectedRenderers = renderInjector.fetchRenderers();

  const injectedProps = useMemo(
    () => ({
      useService,
      components: {
        Fill,
        Slot,
      },
    }),
    [],
  );

  return (
    <Fragment>
      {injectedRenderers.map(({ Renderer }, index) => (
        <Renderer key={index} {...injectedProps} />
      ))}
    </Fragment>
  );
};
