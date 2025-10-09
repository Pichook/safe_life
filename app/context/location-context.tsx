import * as Location from 'expo-location';
import React, { createContext, useContext, useEffect, useState } from 'react';

type LocationContextType = {
  location: Location.LocationObject | null;
};

const LocationContext = createContext<LocationContextType>({ location: null });

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.log("Permission to access location was denied");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      } catch (e) {
        console.log("Error fetching location:", e);
      }
    })();
  }, []);

  return (
    <LocationContext.Provider value={{ location }}>
      {children}
    </LocationContext.Provider>
  );
};

// Custom hook to use location
export const useLocation = () => useContext(LocationContext);
