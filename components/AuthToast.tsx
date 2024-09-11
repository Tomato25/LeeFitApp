import React, { useEffect, useState } from "react";
import Toast from "react-native-root-toast";

const AuthToast = (errorMessage: any) => {

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setTimeout(() => 
            setIsVisible(true)
        , 500); // show toast after 0.5s

        setTimeout(() => setIsVisible(false)
        , 2000); // show toast after 2s // hide toast after 5s

    }, [])

const ErrorMessage = errorMessage

  return (
    <Toast
      visible={isVisible}
      position={Toast.positions.BOTTOM}
      shadow={true}
      animation={true}
      hideOnPress={true}
    >{ErrorMessage}</Toast>
  );
};

export default AuthToast;
