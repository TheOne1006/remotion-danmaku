import { Composition } from "remotion";
import { DanmuExample, danmuExampleSchema } from "./DanmuExample";
import type { DanmuConfig } from "remotion-danmaku";
import exampleDanmuConfig from "./data/example-danmu.json";

const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="DanmuExample"
        component={DanmuExample}
        durationInFrames={900}
        fps={30}
        width={1920}
        height={1080}
        schema={danmuExampleSchema}
        defaultProps={{
          config: exampleDanmuConfig as DanmuConfig,
        }}
      />
    </>
  );
};

export default Root;
