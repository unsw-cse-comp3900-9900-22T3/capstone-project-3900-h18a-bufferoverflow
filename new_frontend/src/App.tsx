import { useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCb1VDjfWT3SjzvLXYr1cPIY-9LmiPtgNw",
  authDomain: "capstone-project-3900.firebaseapp.com",
  projectId: "capstone-project-3900",
  storageBucket: "capstone-project-3900.appspot.com",
  messagingSenderId: "170406441967",
  appId: "1:170406441967:web:50e7f227c623a2fa12fc1a",
  measurementId: "G-FLJ5F8PLY6"
};

function App() {
  useEffect(() => { getAnalytics(initializeApp(firebaseConfig)) }, [])
  return (
    <div>
    </div>
  );
}

export default App;
