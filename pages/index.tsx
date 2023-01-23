import PixelArt from "#assets/capsules";
import { StoreBuilderProps } from "#assets/contexts/store";
import { useLocalStorage } from "#assets/hooks";

export default function Index() {
  const [state, setState] = useLocalStorage<StoreBuilderProps>('pixelart');

  return <PixelArt
    {...(state || {})}
    onChange={(state) => {
      const { clip, clipHeight, clipWidth } = state;
      setState({ clip, height: clipHeight, width: clipWidth });
    }}
  />;
}
