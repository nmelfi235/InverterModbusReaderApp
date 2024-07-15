import { useState, useEffect } from "react";
export default function OnlineIndicator() {
  const [online, setOnline] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://100.118.246.100:1880/online")
        .then((res) => res.json())
        .then((data) => {
          setOnline(data.online);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="online-indicator">
      {online ? (
        <div className="online">Online</div>
      ) : (
        <div className="offline">Offline</div>
      )}
    </div>
  );
}
