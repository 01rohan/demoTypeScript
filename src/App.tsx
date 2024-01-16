import React from "react";
import { Provider } from "react-redux";
import UserRegistrationForm from "./components/UserRegistrationForm";
import store from "./redux/store";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <UserRegistrationForm />
      </div>
    </Provider>
  );
};

export default App;
