import * as React from 'react';
import {AuthState} from "./AuthState";
import {useDispatch} from "react-redux";
import {loadAuthStateAsync, AppDispatch} from "./store";


export default function App() {
  // Trigger auth state to load as soon as the page loads.
  const dispatch = useDispatch<AppDispatch>();
  dispatch(loadAuthStateAsync());

  return (
      <AuthState />
  );
}
