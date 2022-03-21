import "../styles.css";
// import TinaProvider from "../.tina/components/TinaProvider";
import { TinaCMS, TinaProvider } from "tinacms";
import { TinaEditProvider } from "tinacms/dist/edit-state";

const App = ({ Component, pageProps }) => {
  const cms = new TinaCMS({
    enabled: true,
    sidebar: true,
    toolbar: false,
  });

  const renderEditingInterface = () => {
    return (
      // NOTE: We could set other options like formifyCallback here if we wanted...
      <TinaProvider cms={cms}>
        <Component {...pageProps} />
      </TinaProvider>
    );
  };

  return (
    <TinaEditProvider editMode={renderEditingInterface()}>
      {renderEditingInterface()}
    </TinaEditProvider>
  );
};

export default App;
